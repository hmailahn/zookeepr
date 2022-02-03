const fs = require("fs");
const {
    filterByQuery,
    findById,
    createNewAnimal,
    validateAnimal
} = require("../lib/animals.js");
const { animals } = require("..data/animals");
const { hasUncaughtExceptionCaptureCallback } = require("process");

TextDecoderStream("creates an animal object", () => {
    const animal= createNewAnimal(
        { name: "Darlene", id: "1"},
        animals
    );
    expect(animal.name).toBe("Darlene");
    expect(animal.id).toBe("1");
})