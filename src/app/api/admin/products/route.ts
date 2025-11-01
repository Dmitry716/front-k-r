import { NextRequest, NextResponse } from "next/server";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { accessories, fences, landscape } from "@/lib/schema";
import { eq } from "drizzle-orm";

const connectionString = process.env.DATABASE_URL || "postgresql://stonerose_user:SimplePass123@localhost:5432/stonerose_db";
const client = postgres(connectionString);
const db = drizzle(client);

// Маппинг категорий к таблицам продуктов
const categoryToTable = {
  // Аксессуары
  'vases': accessories,
  'вазы': accessories,
  'lamps': accessories,
  'лампады': accessories,
  'sculptures': accessories,
  'скульптуры': accessories,
  'frames': accessories,
  'рамки': accessories,
  'bronze': accessories,
  'изделия-из-бронзы': accessories,
  'plates': accessories,
  'таблички': accessories,
  
  // Ограды
  'granite': fences,
  'гранитные-ограды': fences,
  'polymer': fences,
  'с-полимерным-покрытием': fences,
  'metal': fences,
  'металлические-ограды': fences,
  
  // Ландшафт
  'benches': landscape,
  'столы-и-скамейки': landscape,
  'gravel': landscape,
  'щебень-декоративный': landscape,
  'metal-elements': landscape,
  'металлические-элементы': landscape,
} as const;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category')?.toLowerCase();

    if (!category) {
      return NextResponse.json(
        { success: false, error: "Требуется параметр category" },
        { status: 400 }
      );
    }

    const table = categoryToTable[category as keyof typeof categoryToTable];
    
    if (!table) {
      return NextResponse.json(
        { success: false, error: `Неизвестная категория продуктов: ${category}` },
        { status: 400 }
      );
    }

    const products = await db.select().from(table).orderBy(table.createdAt);
    return NextResponse.json({ 
      success: true, 
      products: products,
      category: category,
      count: products.length 
    });
  } catch (error) {
    console.error("Ошибка при получении продуктов:", error);
    return NextResponse.json({ success: false, error: "Ошибка при получении продуктов" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, id, hit, popular, category, data } = body;

    if (action === "update_status") {
      if (!category) {
        return NextResponse.json({ success: false, error: "Требуется параметр category" }, { status: 400 });
      }

      const table = categoryToTable[category.toLowerCase() as keyof typeof categoryToTable];
      
      if (!table) {
        return NextResponse.json({ success: false, error: "Неизвестная категория продуктов" }, { status: 400 });
      }

      // Определяем какая таблица и какие поля доступны
      const updateData: any = {};
      
      // Только для оград есть поле popular
      if (table === fences && popular !== undefined) {
        updateData.popular = popular;
      }
      
      // Для аксессуаров и ландшафта пока нет полей hit/popular
      
      if (Object.keys(updateData).length === 0) {
        return NextResponse.json({ 
          success: false, 
          error: "Для данной категории недоступно обновление статуса hit/popular" 
        }, { status: 400 });
      }

      const updatedProduct = await db
        .update(table)
        .set(updateData)
        .where(eq(table.id, id))
        .returning();

      if (updatedProduct.length === 0) {
        return NextResponse.json({ success: false, error: "Продукт не найден" }, { status: 404 });
      }

      return NextResponse.json({ 
        success: true, 
        message: "Статус продукта обновлен",
        product: updatedProduct[0] 
      });
    }

    if (action === "update_product") {
      if (!category || !data) {
        return NextResponse.json({ success: false, error: "Требуются параметры category и data" }, { status: 400 });
      }

      const table = categoryToTable[category.toLowerCase() as keyof typeof categoryToTable];
      
      if (!table) {
        return NextResponse.json({ success: false, error: "Неизвестная категория продуктов" }, { status: 400 });
      }

      // Обновляем данные продукта в соответствующей таблице
      const updateData: any = {};
      if (data.name !== undefined) updateData.name = data.name;
      if (data.price !== undefined) updateData.price = data.price;
      if (data.oldPrice !== undefined) updateData.oldPrice = data.oldPrice;
      if (data.category !== undefined) updateData.category = data.category;
      if (data.image !== undefined) updateData.image = data.image;
      if (data.options !== undefined) updateData.options = data.options;

      const updatedProduct = await db
        .update(table)
        .set(updateData)
        .where(eq(table.id, id))
        .returning();

      if (updatedProduct.length === 0) {
        return NextResponse.json({ success: false, error: "Продукт не найден" }, { status: 404 });
      }

      return NextResponse.json({ 
        success: true, 
        message: "Продукт успешно обновлен",
        product: updatedProduct[0] 
      });
    }

    return NextResponse.json({ success: false, error: "Неизвестное действие" }, { status: 400 });
  } catch (error) {
    console.error("Ошибка при обновлении продукта:", error);
    return NextResponse.json({ success: false, error: "Ошибка при обновлении продукта" }, { status: 500 });
  }
}