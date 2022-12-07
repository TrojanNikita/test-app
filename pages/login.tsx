import {Button, Card, Form, Input, notification} from 'antd'
import {users} from "../data/users";
import {User} from "../types/user";
import {useRouter} from "next/router";

const FormItem = Form.Item

const content = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw'
}

const card = {
    width: '300px',
    height: '300px'
}

export default function Login() {
    const [form] = Form.useForm<Omit<User, 'id'>>()
    const router = useRouter()
    const [api, contextHolder] = notification.useNotification()

    const handleSubmit = () => form
        .validateFields()
        .then(async (values) => {
            const current = users.find(user => user.username === values.username && user.password === values.password)

            if (current) {
                document.cookie = [
                    `session_id=${current.id}`,
                    `expires=${new Date(Date.now() + 8 * 3600000)}`,
                    'path=/'
                ].join('; ')

                await router.push('/')
            } else {
                api.error({
                    message: `Пользователь ${values.username} не найден!`,
                    description: 'Повторите попытку или зарегестрируйтесь'
                })
            }
        })

    return (
        <div style={content}>
            {contextHolder}
            <Card title="Войти" style={card}>
                <Form
                    layout="horizontal"
                    size="large"
                    form={form}
                    onFinish={handleSubmit}
                >
                    <FormItem
                        name="username"
                        rules={[
                            { required: true, message: 'Введите имя пользователя' }
                        ]}
                    >
                        <Input placeholder="Username"/>
                    </FormItem>

                    <FormItem
                        name="password"
                        rules={[
                            { required: true, message: 'Введите пароль' }
                        ]}
                    >
                        <Input placeholder="Password"/>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit" onSubmit={handleSubmit}>
                            Войти
                        </Button>
                        <Button type="link">
                            Регистрация
                        </Button>
                    </FormItem>
                </Form>
            </Card>
        </div>
    )
}
