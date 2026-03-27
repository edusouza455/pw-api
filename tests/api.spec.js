// @ts-check
import { test, expect } from '@playwright/test'; 
import { faker } from '@faker-js/faker';

test.describe('Suite de Testes', () => {

  /** @type {number} */
  let userId;

  test('Deve criar um novo usuário com sucesso', async ({ request }) => {
    const response = await request.post('users', {
      data: {
        name: 'Eduardo Coutinho',
        gender: 'male',
        email: faker.internet.email(),
        status: 'active'
      }
    });

    console.log('STATUS DA API:', response.status());

    expect(response.status()).toBe(201);
    
    const body = await response.json();
    userId = body.id
  
  });

  test('Deve buscar os detalhes do usuário recém-criado', async ({ request }) => {
    const response_post = await request.post('users', {
      data: {
        name: 'Eduardo Coutinho',
        gender: 'male',
        email: faker.internet.email(),
        status: 'active'
      }
    });;

    expect(response_post.status()).toBe(201); 
    const postBody = await response_post.json();
    const userId = postBody.id; 

    const response = await request.get(`users/${userId}`);
    expect(response.status()).toBe(200);
    
    const body = await response.json();
    expect(body.id).toBe(userId);

     console.log('STATUS DA API:', response.status());
  });

  test('Deve alterar os detalhes do usuário', async ({ request }) => {
    const response_post = await request.post('users', {
      data: {
        name: 'Eduardo Coutinho',
        gender: 'male',
        email: faker.internet.email(),
        status: 'active'
      }
    });

    expect(response_post.status()).toBe(201); 
    const postBody = await response_post.json();
    const userId = postBody.id; 

    const response = await request.put(`users/${userId}`, {
      data: {
        name: 'Eduardo Coutinho Atualizado',
        status: 'inactive'
      }
    });
    
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.name).toBe('Eduardo Coutinho Atualizado');

    console.log('STATUS DA API:', response.status());
  });

  test('Deve excluir o usuário', async ({ request }) => {
    const response_post = await request.post('users', {
      data: {
        name: 'Eduardo Coutinho',
        gender: 'male',
        email: faker.internet.email(),
        status: 'active'
      }
    });

    expect(response_post.status()).toBe(201); 
    const postBody = await response_post.json();
    const userId = postBody.id; 

    const response = await request.delete(`users/${userId}`, {
      data: {
        name: 'Eduardo Coutinho Atualizado',
        status: 'inactive'
      }
    });
    
    expect(response.status()).toBe(204);

    console.log('STATUS DA API:', response.status());
  });

  test('Tenta Criar user sem nome', async ({ request }) => {
    const response = await request.post('users', {
      data: {
        name: '',
        gender: 'male',
        email: faker.internet.email(),
        status: 'active'
      }
    });

    console.log('STATUS DA API:', response.status());

    expect(response.status()).toBe(422);
  
  });



});