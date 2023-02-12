-- CreateTable
CREATE TABLE "Plant" (
    "id" SERIAL NOT NULL,
    "colloquial_name" TEXT NOT NULL,
    "family" TEXT NOT NULL,
    "genus" TEXT NOT NULL,
    "species" TEXT NOT NULL,
    "plant_kingdom" TEXT NOT NULL,
    "descriptor" TEXT NOT NULL,
    "project" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "kew_photo" TEXT NOT NULL,
    "project_herbarium_link" TEXT NOT NULL,

    CONSTRAINT "Plant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlantPart" (
    "id" SERIAL NOT NULL,
    "collection" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "plant_id" INTEGER NOT NULL,

    CONSTRAINT "PlantPart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlantPartPicture" (
    "id" SERIAL NOT NULL,
    "path" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "plant_part_id" INTEGER NOT NULL,

    CONSTRAINT "PlantPartPicture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PageView" (
    "id" SERIAL NOT NULL,
    "page" TEXT NOT NULL,
    "country" TEXT NOT NULL,

    CONSTRAINT "PageView_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PlantPart" ADD CONSTRAINT "PlantPart_plant_id_fkey" FOREIGN KEY ("plant_id") REFERENCES "Plant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlantPartPicture" ADD CONSTRAINT "PlantPartPicture_plant_part_id_fkey" FOREIGN KEY ("plant_part_id") REFERENCES "PlantPart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
