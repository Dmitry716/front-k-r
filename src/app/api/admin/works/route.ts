import { NextRequest, NextResponse } from "next/server";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { works } from "@/lib/schema";
import { eq, desc } from "drizzle-orm";

const connectionString = process.env.DATABASE_URL || "postgresql://stonerose_user:SimplePass123@localhost:5432/stonerose_db";
const client = postgres(connectionString);
const db = drizzle(client);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '100');

    const worksData = await db
      .select()
      .from(works)
      .orderBy(desc(works.createdAt))
      .limit(limit);

    return NextResponse.json({ 
      success: true, 
      data: worksData,
      count: worksData.length 
    });
  } catch (error) {
    console.error("Ошибка при получении работ:", error);
    return NextResponse.json({ success: false, error: "Ошибка при получении работ" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, image, productId, productType, category } = body;

    if (!title || !image) {
      return NextResponse.json(
        { success: false, error: "Требуются поля title и image" },
        { status: 400 }
      );
    }

    const newWork = await db
      .insert(works)
      .values({
        title,
        description: description || null,
        image,
        productId: productId || null,
        productType: productType || "monuments",
        category: category || null,
        isActive: true,
      })
      .returning();

    return NextResponse.json({ 
      success: true, 
      message: "Работа успешно создана",
      data: newWork[0] 
    });
  } catch (error) {
    console.error("Ошибка при создании работы:", error);
    return NextResponse.json({ success: false, error: "Ошибка при создании работы" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();
    
    if (!id) {
      return NextResponse.json({ success: false, error: "ID работы не указан" }, { status: 400 });
    }

    const body = await request.json();
    const { title, description, image, productId, productType, category } = body;

    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (image !== undefined) updateData.image = image;
    if (productId !== undefined) updateData.productId = productId;
    if (productType !== undefined) updateData.productType = productType;
    if (category !== undefined) updateData.category = category;

    const updatedWork = await db
      .update(works)
      .set(updateData)
      .where(eq(works.id, parseInt(id)))
      .returning();

    if (updatedWork.length === 0) {
      return NextResponse.json({ success: false, error: "Работа не найдена" }, { status: 404 });
    }

    return NextResponse.json({ 
      success: true, 
      message: "Работа успешно обновлена",
      data: updatedWork[0] 
    });
  } catch (error) {
    console.error("Ошибка при обновлении работы:", error);
    return NextResponse.json({ success: false, error: "Ошибка при обновлении работы" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();
    
    if (!id) {
      return NextResponse.json({ success: false, error: "ID работы не указан" }, { status: 400 });
    }

    const deletedWork = await db
      .delete(works)
      .where(eq(works.id, parseInt(id)))
      .returning();

    if (deletedWork.length === 0) {
      return NextResponse.json({ success: false, error: "Работа не найдена" }, { status: 404 });
    }

    return NextResponse.json({ 
      success: true, 
      message: "Работа успешно удалена" 
    });
  } catch (error) {
    console.error("Ошибка при удалении работы:", error);
    return NextResponse.json({ success: false, error: "Ошибка при удалении работы" }, { status: 500 });
  }
}