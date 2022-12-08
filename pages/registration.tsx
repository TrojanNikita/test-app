import {Button, Card, Form, Input, InputNumber, notification} from 'antd'
import users from "../data/users.json";
import {User} from "../types/user";
import {useRouter} from "next/router";
import Head from "next/head";
import styles from '../styles/Auth.module.less'
import Link from "next/link";

export default function Registration() {
    const [form] = Form.useForm<Omit<User, 'id'>>()
    const router = useRouter()
    const [api, contextHolder] = notification.useNotification()

    const handleSubmit = () => form
        .validateFields()
        .then(async (values) => {
            const resp = await fetch(
                `/api/users/create`,
                {
                    method: 'POST',
                    body: JSON.stringify(values)
                }
            )

            if (resp.ok) {
                await router.push('/')
            } else {
                api.error({
                    message: `Пользователь ${values.username} не найден!`,
                    description: 'Повторите попытку или зарегестрируйтесь'
                })
            }
        })

    return (
        <div className={styles.page}>
            <Head>
                <title>Test App | Регистрация</title>
            </Head>
            {contextHolder}
            <Card title="Регистрация" className={styles.card}>
                <Form
                    layout="horizontal"
                    size="large"
                    form={form}
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        name="username"
                        rules={[
                            { required: true, message: 'Введите имя пользователя' }
                        ]}
                    >
                        <Input placeholder="Имя пользователя"/>
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            { required: true, message: 'Введите пароль' }
                        ]}
                    >
                        <Input placeholder="Пароль"/>
                    </Form.Item>

                    <Form.Item
                        name="age"
                        rules={[
                            { required: true, message: 'Введите возраст' }
                        ]}
                    >
                        <InputNumber placeholder="Возраст"/>
                    </Form.Item>
                    <Form.Item>
                        <div className={styles.actions}>
                            <Button type="primary" htmlType="submit" onSubmit={handleSubmit}>
                                Готово
                            </Button>
                            <Link href="/registration">
                                Войти
                            </Link>
                        </div>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}
