import {Button, Card, Form, Input, InputNumber, notification} from 'antd'
import {User} from "../types/user";
import {useRouter} from "next/router";
import Head from "next/head";
import styles from '../styles/Auth.module.less'
import Link from "next/link";

export default function SignUp() {
    const [form] = Form.useForm<Omit<User, 'id'>>()
    const router = useRouter()
    const [toast, contextHolder] = notification.useNotification()

    const handleSubmit = () => form
        .validateFields()
        .then(async (values) => {
            const resp = await fetch(
                `/api/auth/sign_up`,
                {
                    method: 'POST',
                    body: JSON.stringify(values)
                }
            )

            if (resp.ok) {
                await router.push('/')
            } else {
                toast.error({
                    message: `Пользователь ${values.username} не найден!`,
                    description: 'Повторите попытку или зарегистрируйтесь'
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
                            <Link href="/sign_up">
                                Войти
                            </Link>
                        </div>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}
