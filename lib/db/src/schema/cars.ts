import {
  date,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
} from "drizzle-orm/pg-core";

export type InspectionCheck = {
  name: string;
  score: number;
  total: number;
  status: "passed" | "attention";
  note: string;
};

export const carsTable = pgTable("cars", {
  id: serial("id").primaryKey(),
  make: text("make").notNull(),
  model: text("model").notNull(),
  trim: text("trim").notNull(),
  year: integer("year").notNull(),
  mileageKm: integer("mileage_km").notNull(),
  priceGel: integer("price_gel").notNull(),
  engine: text("engine").notNull(),
  transmission: text("transmission").notNull(),
  fuelType: text("fuel_type").notNull(),
  imagePath: text("image_path").notNull(),
  inspectionScore: integer("inspection_score").notNull(),
  inspectionMax: integer("inspection_max").notNull(),
  inspectionDate: date("inspection_date", { mode: "string" }).notNull(),
  inspectionDetails: jsonb("inspection_details")
    .$type<InspectionCheck[]>()
    .notNull(),
  reportNote: text("report_note").notNull(),
});

export type Car = typeof carsTable.$inferSelect;
