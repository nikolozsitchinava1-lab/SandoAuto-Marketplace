import { and, asc, desc, eq, gte, lte } from "drizzle-orm";
import { Router, type IRouter } from "express";
import {
  CreateSellerRequestBody,
  CreateSellerRequestResponse,
  GetCarParams,
  GetCarResponse,
  ListCarsQueryParams,
  ListCarsResponse,
} from "@workspace/api-zod";
import { carsTable, db, sellerRequestsTable } from "@workspace/db";

const router: IRouter = Router();

router.get("/cars", async (req, res): Promise<void> => {
  const normalizedQuery = Object.fromEntries(
    Object.entries(req.query).filter(([, value]) => value !== ""),
  );
  const parsed = ListCarsQueryParams.safeParse(normalizedQuery);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid car search filters." });
    return;
  }

  const filters = [
    parsed.data.make
      ? eq(carsTable.make, parsed.data.make)
      : undefined,
    parsed.data.yearFrom !== undefined
      ? gte(carsTable.year, parsed.data.yearFrom)
      : undefined,
    parsed.data.yearTo !== undefined
      ? lte(carsTable.year, parsed.data.yearTo)
      : undefined,
    parsed.data.priceFrom !== undefined
      ? gte(carsTable.priceGel, parsed.data.priceFrom)
      : undefined,
    parsed.data.priceTo !== undefined
      ? lte(carsTable.priceGel, parsed.data.priceTo)
      : undefined,
  ];

  const cars = await db
    .select()
    .from(carsTable)
    .where(and(...filters))
    .orderBy(desc(carsTable.year), asc(carsTable.make), asc(carsTable.model));

  res.json(
    ListCarsResponse.parse(
      cars.map((car) => ({
        ...car,
        inspectionDate: String(car.inspectionDate).slice(0, 10),
      })),
    ),
  );
});

router.get("/cars/:id", async (req, res): Promise<void> => {
  const params = GetCarParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: "Invalid vehicle ID." });
    return;
  }

  const [car] = await db
    .select()
    .from(carsTable)
    .where(eq(carsTable.id, params.data.id));

  if (!car) {
    res.status(404).json({ error: "Vehicle not found." });
    return;
  }

  res.json(
    GetCarResponse.parse({
      ...car,
      inspectionDate: String(car.inspectionDate).slice(0, 10),
    }),
  );
});

router.post("/seller-requests", async (req, res): Promise<void> => {
  const parsed = CreateSellerRequestBody.safeParse(req.body);
  if (!parsed.success) {
    req.log.warn(
      {
        issues: parsed.error.issues.map(({ path, message }) => ({
          path,
          message,
        })),
      },
      "Invalid seller inspection request",
    );
    res.status(400).json({ error: "Please check the request details." });
    return;
  }

  const [request] = await db
    .insert(sellerRequestsTable)
    .values({
      ...parsed.data,
      notes: parsed.data.notes ?? "",
    })
    .returning({ id: sellerRequestsTable.id });

  res
    .status(201)
    .json(
      CreateSellerRequestResponse.parse({ id: request.id, status: "received" }),
    );
});

export default router;
