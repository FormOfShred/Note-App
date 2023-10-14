// Execute: npx ts-node init-db.ts

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  // Use the prisma API to fill the database with some initial data

  // USER
  const createManyUsers = await prisma.user.createMany({
    data: [
      {username: 'admin', password: '$2a$12$fGWepGbJB6ecg.e/hD20DOREwphxSJEzB8xZvZdjTqF1fTyBgSQt.'}, // password: t
      {username: 'user1', password: '$2a$12$fGWepGbJB6ecg.e/hD20DOREwphxSJEzB8xZvZdjTqF1fTyBgSQt.'}, 
      {username: 'user2', password: '$2a$12$fGWepGbJB6ecg.e/hD20DOREwphxSJEzB8xZvZdjTqF1fTyBgSQt.'}, 
    ], 
    skipDuplicates: true, 
  })

  // LABEL 
  const createManyLabels = await prisma.label.createMany({
    data: [
      {name: 'Work', color: '#FF0000'}, 
      {name: 'Personal', color: '#00FF00'},
      {name: 'ToDo', color: '#C83E4D'},
      {name: 'Finances', color: '#001F54'},
    ], 
    skipDuplicates: true, 
  })

  // FOLDER 
  const createManyFolders = await prisma.folder.createMany({
    data: [
      {name: 'all', color: '#85BDA6', userId: 1},
      {name: 'all', color: '#85BDA6', userId: 2}, 
      {name: 'important', color: '#FF0000', userId: 2}, 
      {name: 'all', color: '#85BDA6', userId: 3}, 
      {name: 'projects', color: '#FF0000', userId: 3}, 
    ], 
    skipDuplicates: true, 
  })

  // NOTE
  const createNote1 = await prisma.note.create({
    data: {
      title: 'Songs', 
      text: 'Talk - Hozier, Wife - Mitski', 
      date: new Date(), 
      userId: 1, 
      folderId: 1, 
      labels: {
        connect: {id: 2}, 
      }, 
    }, 
  })

  const createNote2 = await prisma.note.create({
    data: {
      title: 'Books', 
      text: 'Daisy Jones & The Six', 
      date: new Date(), 
      userId: 1, 
      folderId: 1, 
      labels: {
        connect: {id: 2}, 
      }, 
    }
  })

  const createNote3 = await prisma.note.create({
    data: {
      title: 'Deadlines', 
      text: 'Submit report = 10/05/2023', 
      date: new Date(), 
      userId: 3, 
      folderId: 4, 
      labels: {
        connect: [{id: 1}, {id: 3}], 
      }, 
    }
  })
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
