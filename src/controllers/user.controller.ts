/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import fs = require('fs');
export interface User {
  name: string;
  id: number;
}

export interface UserParams {
  id: string;
}

@Controller('user')
export class UserController {
  @Get(':id')
  async findOne(@Param() params: UserParams): Promise<User> {
    const data = await fs.promises.readFile('user.json');
    // @ts-ignore
    const user: User[] = JSON.parse(data);
    return user.find((item) => item.id === Number(params.id));
  }

  @Post()
  async create(@Body() body: User): Promise<any> {
    const data = await fs.promises.readFile('user.json');
    // @ts-ignore
    const user: User[] = JSON.parse(data);
    user.push(body);
    await fs.promises.writeFile('user.json', JSON.stringify(user));
  }
}
