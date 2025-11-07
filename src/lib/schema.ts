import { pgTable, serial, text, numeric, varchar, timestamp, jsonb, boolean } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: serial("id").primaryKey().notNull(),
  slug: varchar("slug").notNull().unique(),
  name: varchar("name").notNull(),
  height: varchar("height"),
  price: numeric("price", { precision: 10, scale: 2 }),
  oldPrice: numeric("old_price", { precision: 10, scale: 2 }),
  discount: numeric("discount", { precision: 10, scale: 2 }),
  category: varchar("category").notNull(),
  image: text("image").notNull(),
  colors: text("colors").notNull(), // JSON строка
  options: text("options").notNull(), // JSON строка
  availability: varchar("availability").default("под заказ"), // в наличии / под заказ
  hit: boolean("hit").default(false),
  popular: boolean("popular").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const epitaphs = pgTable("epitaphs", {
  id: serial("id").primaryKey().notNull(),
  text: text("text").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const accessories = pgTable("accessories", {
  id: serial("id").primaryKey().notNull(),
  slug: varchar("slug").notNull().unique(),
  name: varchar("name").notNull(),
  price: numeric("price", { precision: 10, scale: 2 }),
  textPrice: varchar("text_price"),
  category: varchar("category").notNull(),
  image: text("image").notNull(),
  colors: text("colors"), // Реальная колонка в базе
  specifications: jsonb("specifications").default({}),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const fences = pgTable("fences", {
  id: serial("id").primaryKey().notNull(),
  slug: varchar("slug").notNull().unique(),
  name: varchar("name").notNull(),
  price: numeric("price", { precision: 10, scale: 2 }),
  textPrice: varchar("text_price"),
  category: varchar("category").notNull(),
  image: text("image").notNull(),
  specifications: jsonb("specifications").default({}),
  popular: boolean("popular").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const campaigns = pgTable("campaigns", {
  id: serial("id").primaryKey().notNull(),
  slug: varchar("slug").notNull().unique(),
  title: varchar("title").notNull(),
  description: text("description"),
  content: text("content").notNull(),
  metaTitle: varchar("meta_title"),
  metaDescription: text("meta_description"),
  featuredImage: text("featured_image"),
  images: jsonb("images").default([]), // массив путей к изображениям
  blocks: jsonb("blocks").default([]), // гибкие блоки контента
  tags: jsonb("tags").default([]), // теги
  products: jsonb("products").default([]), // массив ID товаров из разных категорий
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const landscape = pgTable("landscape", {
  id: serial("id").primaryKey().notNull(),
  slug: varchar("slug").notNull().unique(),
  name: varchar("name").notNull(),
  price: numeric("price", { precision: 10, scale: 2 }),
  textPrice: varchar("text_price"),
  category: varchar("category").notNull(),
  image: text("image").notNull(),
  specifications: jsonb("specifications").default({}),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Таблицы для памятников по категориям

// Таблица для одиночных памятников
export const singleMonuments = pgTable("single_monuments", {
  id: serial("id").primaryKey().notNull(),
  slug: varchar("slug").notNull().unique(),
  name: varchar("name").notNull(),
  height: varchar("height"),
  price: numeric("price", { precision: 10, scale: 2 }),
  oldPrice: numeric("old_price", { precision: 10, scale: 2 }),
  discount: numeric("discount", { precision: 10, scale: 2 }),
  category: varchar("category").notNull(),
  image: text("image").notNull(),
  options: text("options").notNull(), // JSON строка
  description: text("description"),
  availability: varchar("availability").default("под заказ"), // в наличии / под заказ
  hit: boolean("hit").default(false),
  popular: boolean("popular").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Таблица для двойных памятников
export const doubleMonuments = pgTable("double_monuments", {
  id: serial("id").primaryKey().notNull(),
  slug: varchar("slug").notNull().unique(),
  name: varchar("name").notNull(),
  height: varchar("height"),
  price: numeric("price", { precision: 10, scale: 2 }),
  oldPrice: numeric("old_price", { precision: 10, scale: 2 }),
  discount: numeric("discount", { precision: 10, scale: 2 }),
  category: varchar("category").notNull(),
  image: text("image").notNull(),
  options: text("options").notNull(), // JSON строка
  description: text("description"),
  availability: varchar("availability").default("под заказ"), // в наличии / под заказ
  hit: boolean("hit").default(false),
  popular: boolean("popular").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Таблица для недорогих памятников
export const cheapMonuments = pgTable("cheap_monuments", {
  id: serial("id").primaryKey().notNull(),
  slug: varchar("slug").notNull().unique(),
  name: varchar("name").notNull(),
  height: varchar("height"),
  price: numeric("price", { precision: 10, scale: 2 }),
  oldPrice: numeric("old_price", { precision: 10, scale: 2 }),
  discount: numeric("discount", { precision: 10, scale: 2 }),
  category: varchar("category").notNull(),
  image: text("image").notNull(),
  options: text("options").notNull(), // JSON строка
  description: text("description"),
  availability: varchar("availability").default("под заказ"), // в наличии / под заказ
  hit: boolean("hit").default(false),
  popular: boolean("popular").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Таблица для памятников в виде креста
export const crossMonuments = pgTable("cross_monuments", {
  id: serial("id").primaryKey().notNull(),
  slug: varchar("slug").notNull().unique(),
  name: varchar("name").notNull(),
  height: varchar("height"),
  price: numeric("price", { precision: 10, scale: 2 }),
  oldPrice: numeric("old_price", { precision: 10, scale: 2 }),
  discount: numeric("discount", { precision: 10, scale: 2 }),
  category: varchar("category").notNull(),
  image: text("image").notNull(),
  options: text("options").notNull(), // JSON строка
  description: text("description"),
  availability: varchar("availability").default("под заказ"), // в наличии / под заказ
  hit: boolean("hit").default(false),
  popular: boolean("popular").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Таблица для памятников в виде сердца
export const heartMonuments = pgTable("heart_monuments", {
  id: serial("id").primaryKey().notNull(),
  slug: varchar("slug").notNull().unique(),
  name: varchar("name").notNull(),
  height: varchar("height"),
  price: numeric("price", { precision: 10, scale: 2 }),
  oldPrice: numeric("old_price", { precision: 10, scale: 2 }),
  discount: numeric("discount", { precision: 10, scale: 2 }),
  category: varchar("category").notNull(),
  image: text("image").notNull(),
  options: text("options").notNull(), // JSON строка
  description: text("description"),
  availability: varchar("availability").default("под заказ"), // в наличии / под заказ
  hit: boolean("hit").default(false),
  popular: boolean("popular").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Таблица для составных памятников
export const compositeMonuments = pgTable("composite_monuments", {
  id: serial("id").primaryKey().notNull(),
  slug: varchar("slug").notNull().unique(),
  name: varchar("name").notNull(),
  height: varchar("height"),
  price: numeric("price", { precision: 10, scale: 2 }),
  oldPrice: numeric("old_price", { precision: 10, scale: 2 }),
  discount: numeric("discount", { precision: 10, scale: 2 }),
  category: varchar("category").notNull(),
  image: text("image").notNull(),
  options: text("options").notNull(), // JSON строка
  description: text("description"),
  availability: varchar("availability").default("под заказ"), // в наличии / под заказ
  hit: boolean("hit").default(false),
  popular: boolean("popular").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Таблица для европейских памятников
export const europeMonuments = pgTable("europe_monuments", {
  id: serial("id").primaryKey().notNull(),
  slug: varchar("slug").notNull().unique(),
  name: varchar("name").notNull(),
  height: varchar("height"),
  price: numeric("price", { precision: 10, scale: 2 }),
  oldPrice: numeric("old_price", { precision: 10, scale: 2 }),
  discount: numeric("discount", { precision: 10, scale: 2 }),
  category: varchar("category").notNull(),
  image: text("image").notNull(),
  options: text("options").notNull(), // JSON строка
  description: text("description"),
  availability: varchar("availability").default("под заказ"), // в наличии / под заказ
  hit: boolean("hit").default(false),
  popular: boolean("popular").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Таблица для памятников с художественной резкой
export const artisticMonuments = pgTable("artistic_monuments", {
  id: serial("id").primaryKey().notNull(),
  slug: varchar("slug").notNull().unique(),
  name: varchar("name").notNull(),
  height: varchar("height"),
  price: numeric("price", { precision: 10, scale: 2 }),
  oldPrice: numeric("old_price", { precision: 10, scale: 2 }),
  discount: numeric("discount", { precision: 10, scale: 2 }),
  category: varchar("category").notNull(),
  image: text("image").notNull(),
  options: text("options").notNull(), // JSON строка
  description: text("description"),
  availability: varchar("availability").default("под заказ"), // в наличии / под заказ
  hit: boolean("hit").default(false),
  popular: boolean("popular").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Таблица для памятников в виде деревьев
export const treeMonuments = pgTable("tree_monuments", {
  id: serial("id").primaryKey().notNull(),
  slug: varchar("slug").notNull().unique(),
  name: varchar("name").notNull(),
  height: varchar("height"),
  price: numeric("price", { precision: 10, scale: 2 }),
  oldPrice: numeric("old_price", { precision: 10, scale: 2 }),
  discount: numeric("discount", { precision: 10, scale: 2 }),
  category: varchar("category").notNull(),
  image: text("image").notNull(),
  options: text("options").notNull(), // JSON строка
  description: text("description"),
  availability: varchar("availability").default("под заказ"), // в наличии / под заказ
  hit: boolean("hit").default(false),
  popular: boolean("popular").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Таблица для мемориальных комплексов
export const complexMonuments = pgTable("complex_monuments", {
  id: serial("id").primaryKey().notNull(),
  slug: varchar("slug").notNull().unique(),
  name: varchar("name").notNull(),
  height: varchar("height"),
  price: numeric("price", { precision: 10, scale: 2 }),
  oldPrice: numeric("old_price", { precision: 10, scale: 2 }),
  discount: numeric("discount", { precision: 10, scale: 2 }),
  category: varchar("category").notNull(),
  image: text("image").notNull(),
  options: text("options").notNull(), // JSON строка
  description: text("description"),
  availability: varchar("availability").default("под заказ"), // в наличии / под заказ
  hit: boolean("hit").default(false),
  popular: boolean("popular").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});


export const works = pgTable("works", {
  id: serial("id").primaryKey().notNull(),
  title: varchar("title").notNull(),
  description: text("description"),
  image: text("image").notNull(), // путь к изображению
  productId: varchar("product_id"), // ID продукта
  productType: varchar("product_type").notNull(), // тип продукта: monuments, fences, accessories, landscape
  category: varchar("category"), // категория для фильтрации
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const blogs = pgTable("blogs", {
  id: serial("id").primaryKey().notNull(),
  slug: varchar("slug").notNull().unique(),
  title: varchar("title").notNull(),
  description: text("description"),
  content: text("content").notNull(),
  metaTitle: varchar("meta_title"),
  metaDescription: text("meta_description"),
  featuredImage: text("featured_image"),
  images: jsonb("images").default([]), // массив дополнительных изображений
  blocks: jsonb("blocks").default([]), // гибкие блоки контента
  tags: jsonb("tags").default([]), // теги
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
