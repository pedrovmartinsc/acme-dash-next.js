import { PrismaClient,InvoiceStatus} from '@prisma/client';
import bcrypt from 'bcryptjs';
import { Acme } from 'next/font/google';

const prisma = new PrismaClient();

async function main(){
  console.log('Iniciado população do banco de dados...');

  const password = await bcrypt.hash('password', 10);
  
  const user = await prisma.user.upsert({
    where: { email: 'admin@acme.com'},
    update: {},
    create: {
        name: 'Admin',
        email: 'admin@acme.com',
        password: password
    }
  });

  console.log('Usuário criado com sucesso.');

  const customer_data = [{
    name: 'Alex Bessa',
    email: 'alex@email.com',
    imageUrl: 'https://ui-avatars.com/api/?nome=Alex+Bessa&background=random'
  },{
    name: 'Valdiana Bessa',
    email: 'valdiana@email.com',
    imageUrl: 'https://ui-avatars.com/api/?nome=Valdiana+Bessa&background=random'

}
{
    name: 'Timóteo Bessa',
    email: 'timoteo@email.com',
    imageUrl: 'https://ui-avatars.com/api/?nome=Timoteo+Bessa&background=random'

  }];

  const customers = [];

  for (const data of customer_data){
    const customer = await prisma.customer.upsert({
        where: {email: data.email},
        update: {},
        create: data
    });

    customers.push(customer);
    console.log(`Cliente criado: ${ customer.name }`);


  };
  const invoiceData = [
  { 
    amount: 15785, 
    status: InvoiceStatus.PENDENTE, 
    data: '2026-01-12', 
    customer: customers[0] 
  },
  { 
    amount: 15722285, 
    status: InvoiceStatus.PENDENTE, 
    data: '2026-02-15', 
    customer: customers[1] 
  },
  { 
    amount: 85400, 
    status: InvoiceStatus.PAGO, 
    data: '2026-03-10', 
    customer: customers[2] 
  },
  { 
    amount: 15733385, 
    status: InvoiceStatus.PENDENTE, 
    data: '2026-04-22', 
    customer: customers[0] 
  },
  { 
    amount: 15781212125, 
    status: InvoiceStatus.PAGO, 
    data: '2026-05-05', 
    customer: customers[1] 
  },
  { 
    amount: 450000, 
    status: InvoiceStatus.PENDENTE, 
    data: '2026-06-18', 
    customer: customers[2] 
  },
  { 
    amount: 15732424285, 
    status: InvoiceStatus.PENDENTE, 
    data: '2026-07-20', 
    customer: customers[0] 
  },
  { 
    amount: 157241285, 
    status: InvoiceStatus.PAGO, 
    data: '2026-08-30', 
    customer: customers[1] 
  },
  { 
    amount: 987654321, 
    status: InvoiceStatus.PAGO, 
    data: '2026-09-14', 
    customer: customers[2] 
  },
  { 
    amount: 15785432324, 
    status: InvoiceStatus.PENDENTE, 
    data: '2026-10-11', 
    customer: customers[0] 
  }
];


for (const data of invoiceData){
  await prisma.invoice.create({
    data:{
      amount: invoice.amount,
      status:, invoice
    }
  })
}
};