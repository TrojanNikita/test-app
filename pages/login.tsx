import {Button, Card, Form, Input, notification} from 'antd'
import {User} from "../types/user";
import {useRouter} from "next/router";
import Head from "next/head";
import styles from '../styles/Auth.module.less'
import Link from "next/link";

export default function Login() {
    const [form] = Form.useForm<Omit<User, 'id'>>()
    const router = useRouter()
    const [toast, contextHolder] = notification.useNotification()

    const handleSubmit = () => form
        .validateFields()
        .then(async (values) => {
            const query = Object.entries(values)
                .map(([key, value]) => `${key}=${value}`)
                .join('&')

            const resp = await fetch(`/api/auth/sign_in?${query}`)

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
                <title>Test App | Вход</title>
            </Head>
            {contextHolder}
            <Card title="Войти" className={styles.card}>
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
                        <Input placeholder="Username"/>
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            { required: true, message: 'Введите пароль' }
                        ]}
                    >
                        <Input placeholder="Password"/>
                    </Form.Item>
                    <Form.Item>
                        <div className={styles.actions}>
                            <Button type="primary" htmlType="submit" onSubmit={handleSubmit}>
                                Войти
                            </Button>
                            <Link href="/sign_up">
                                Регистрация
                            </Link>
                        </div>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}
