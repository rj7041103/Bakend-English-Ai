-- CreateTable
CREATE TABLE "Test" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "question" TEXT NOT NULL,
    "options" JSONB NOT NULL,
    "answer" TEXT NOT NULL,
    "english_level" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Test_question_key" ON "Test"("question");
