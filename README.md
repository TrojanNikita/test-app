# Test App

## Запуск проекта в режиме разработки

```
$ yarn install
$ yarn dev
```

## Docker

Создать образ:

```bash
docker build -t test-app .
```
Запустить контейнер:

```bash
docker run --name=some-test-app -p 3000:3000 -itd test-app
```
