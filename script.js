const { faker } = require('@faker-js/faker');
const fs = require('fs');

// Get the length from the command line arguments
const length = parseInt(process.argv[2], 10);

if (isNaN(length) || length <= 0) {
  console.error('Please provide a valid positive number for the length of the array.');
  process.exit(1);
}

function generateObject() {
  return {
    cpf: faker.string.uuid(),
    cliente: faker.company.name(),
    primeiroNome: faker.person.firstName(),
    dataNascimento: faker.date.past({years: 60, refDate: '2004-01-01T00:00:00.000Z'}),
    atividade: faker.person.jobTitle(),
    celular: faker.phone.number(),
    sms: faker.phone.number(),
    telefone: faker.phone.number(),
    email: faker.internet.email(),
    endereco: faker.location.streetAddress(),
    numero: faker.number.int({ min: 1, max: 999 }).toString(),
    bairro: faker.location.county(),
    complemento: faker.location.secondaryAddress(),
    localidade: faker.location.city(),
    uf: faker.location.state({abbreviated: true}),
    cep: faker.location.zipCode(),
    contratoCheque: faker.finance.accountNumber(),
    dataUltimaCompra: faker.date.past(),
    dataUltimaMala: faker.date.past({years: 5}),
    tipoMalaCliente: faker.commerce.productName(),
    codigoTipoMalaCliente: faker.number.int({ min: 1, max: 5}),
    codigoCliente: faker.number.int(),
    renda: faker.number.int({ min: 1000, max: 10000 }),
    valorLimiteParcela: faker.number.int({ min: 100, max: 1000 }),
    valorMaiorParcelaPaga: faker.number.int({ min: 100, max: 1000 }),
    maiorValorFinanciadoCp: faker.number.int({ min: 1000, max: 100000 }),
    qtdeContratosQuitados: faker.number.int({ min: 0, max: 10 }),
    plano: [
      {
        parcelas: faker.number.int({ min: 1, max: 12 }),
        valor: faker.number.int({ min: 100, max: 1000 })
      }
    ]
  };
}

function generateArray(length) {
  return Array.from({ length }, generateObject);
}

const array = generateArray(length);

// Prepare JSON content
const jsonContent = JSON.stringify(array, null, 2);

// Write to file
fs.writeFile(`${length}_mala_direta.json`, jsonContent, (err) => {
  if (err) {
    console.error('Error writing to file', err);
  } else {
    console.log('Successfully wrote to output.json');
  }
});
