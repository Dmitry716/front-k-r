import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('file');

    if (!filename) {
      return NextResponse.json(
        { error: 'Missing file parameter' },
        { status: 400 }
      );
    }

    // Валидируем имя файла - только разрешенные файлы
    const allowedFiles = [
      'single-monuments.xlsx',
      'double-monuments.xlsx',
      'composite-monuments.xlsx',
      'exclusive-monuments.xlsx',
    ];

    if (!allowedFiles.includes(filename)) {
      return NextResponse.json(
        { error: 'File not allowed' },
        { status: 403 }
      );
    }

    // Читаем файл из public/import-examples
    const filePath = path.join(process.cwd(), 'public', 'import-examples', filename);
    const fileBuffer = await readFile(filePath);

    // Возвращаем файл с правильными заголовками
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': fileBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json(
      { error: 'File not found' },
      { status: 404 }
    );
  }
}
