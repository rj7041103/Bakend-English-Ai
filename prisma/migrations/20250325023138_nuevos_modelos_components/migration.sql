-- CreateTable
CREATE TABLE "RearrangeSentences" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "level" INTEGER NOT NULL,
    "words" JSONB NOT NULL,
    "sentence" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "PracticeTest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "question" TEXT NOT NULL,
    "options" JSONB NOT NULL,
    "answer" TEXT NOT NULL,
    "userAnswer" TEXT,
    "english_level" TEXT NOT NULL
);
