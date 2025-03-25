/*
  Warnings:

  - A unique constraint covering the columns `[sentence]` on the table `RearrangeSentences` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "RearrangeSentences_sentence_key" ON "RearrangeSentences"("sentence");
