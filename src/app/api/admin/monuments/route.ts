import { NextRequest, NextResponse } from "next/server";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { products, singleMonuments, doubleMonuments, cheapMonuments, crossMonuments, heartMonuments, compositeMonuments, europeMonuments, artisticMonuments, treeMonuments, complexMonuments } from "@/lib/schema";
import { eq } from "drizzle-orm";

const connectionString = process.env.DATABASE_URL || "postgresql://stonerose_user:SimplePass123@localhost:5432/stonerose_db";
const client = postgres(connectionString);
const db = drizzle(client);

// Маппинг категорий к таблицам памятников
const categoryToTable = {
  'single': singleMonuments,
  'одиночные': singleMonuments,
  'double': doubleMonuments,
  'двойные': doubleMonuments,
  'cheap': cheapMonuments,
  'недорогие': cheapMonuments,
  'cross': crossMonuments,
  'в-виде-креста': crossMonuments,
  'heart': heartMonuments,
  'в-виде-сердца': heartMonuments,
  'composite': compositeMonuments,
  'составные': compositeMonuments,
  'europe': europeMonuments,
  'европейские': europeMonuments,
  'artistic': artisticMonuments,
  'художественная-резка': artisticMonuments,
  'tree': treeMonuments,
  'в-виде-деревьев': treeMonuments,
  'complex': complexMonuments,
  'мемориальные-комплексы': complexMonuments,
  'exclusive': products, // используем таблицу products для эксклюзивных памятников
  'эксклюзивные': products,
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
        { success: false, error: "Неизвестная категория памятников" },
        { status: 400 }
      );
    }

    const monuments = await db.select().from(table).orderBy(table.createdAt);
    return NextResponse.json({ 
      success: true, 
      products: monuments,
      category: category,
      count: monuments.length 
    });
  } catch (error) {
    console.error("Ошибка при получении памятников:", error);
    return NextResponse.json({ success: false, error: "Ошибка при получении памятников" }, { status: 500 });
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
        return NextResponse.json({ success: false, error: "Неизвестная категория памятников" }, { status: 400 });
      }

      // Обновляем статусы hit и popular в соответствующей таблице
      const updatedProduct = await db
        .update(table)
        .set({ 
          hit: hit !== undefined ? hit : undefined,
          popular: popular !== undefined ? popular : undefined,
        })
        .where(eq(table.id, id))
        .returning();

      if (updatedProduct.length === 0) {
        return NextResponse.json({ success: false, error: "Памятник не найден" }, { status: 404 });
      }

      return NextResponse.json({ 
        success: true, 
        message: "Статус памятника обновлен",
        product: updatedProduct[0] 
      });
    }

    if (action === "update_product") {
      if (!category || !data) {
        return NextResponse.json({ success: false, error: "Требуются параметры category и data" }, { status: 400 });
      }

      const table = categoryToTable[category.toLowerCase() as keyof typeof categoryToTable];
      
      if (!table) {
        return NextResponse.json({ success: false, error: "Неизвестная категория памятников" }, { status: 400 });
      }

      // Обновляем данные памятника в соответствующей таблице
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
        return NextResponse.json({ success: false, error: "Памятник не найден" }, { status: 404 });
      }

      return NextResponse.json({ 
        success: true, 
        message: "Памятник успешно обновлен",
        product: updatedProduct[0] 
      });
    }

    return NextResponse.json({ success: false, error: "Неизвестное действие" }, { status: 400 });
  } catch (error) {
    console.error("Ошибка при обновлении памятника:", error);
    return NextResponse.json({ success: false, error: "Ошибка при обновлении памятника" }, { status: 500 });
  }
}
