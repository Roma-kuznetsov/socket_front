# React + Vite

## Для запуска проекта
```bash
# development
$ npm run dev

# build
$ npm run build
```

Нужно изменить метод логина на бекенде (auth.service.ts) так как нет запроса /me или /profile
(да id мне приходит при регистрации но это сломается если мы зарегаем 1 ак а войдем в другой или просто войдем в уже зареганый)
```javascript
    async login(user: any) {
        const payload = { username: user.username, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
            username:user.username,
            id:user.id
        };
    }
```

Так же бек с апдейтом доступен по ссылке https://github.com/Roma-kuznetsov/socket_back

## Очевидные сложности
- В итории сообщений не приходят username по этому если автора нет в руме то место имени будет N/A
- История личных сообщений сохраняется только локально, на беке они тоже вроде сохраняются но в руму не попадают. А через private_message приходит только актуальное сообщение.
Был вариант сохранять личные сообщения в localStorage или IndexedDB но почему тогда мы токен там не храним?) Да и менеджментить бы пришлось локалку если с одного браузера 2 разных юзера, а времени на это нет. (Можно считать это безопасностью).