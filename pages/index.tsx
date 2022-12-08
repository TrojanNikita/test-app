import {GetServerSidePropsContext} from "next";
import {Button, Layout, Table, Tag, Typography} from "antd";
import {ColumnsType} from "antd/lib/table";
import {User} from "../types/user";
import {useRouter} from "next/router";
import Head from "next/head";
import styles from 'styles/Main.module.less'

export async function getServerSideProps({ req, res }: GetServerSidePropsContext) {
    if (!req.cookies?.['session_id']) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }

    const resp = await fetch('http:localhost:3000/api/users/list')
    const users = await resp.json()

    return {
        props: { users }
    }
}

type Props = {
    users: User[]
}

export default function Main({ users }: Props) {
    console.log(users)
    const router = useRouter()

    const columns: ColumnsType<User> = [
        {
            title: 'Имя пользователя',
            key: 'username',
            dataIndex: 'username',
            render: (text) => <Typography.Text>{text}</Typography.Text>,
        },
        {
            title: 'Пароль',
            key: 'password',
            dataIndex: 'password',
            render: (text) => <Typography.Text>{text}</Typography.Text>,
        },
        {
            title: 'Возраст',
            key: 'age',
            dataIndex: 'age',
            render: (age) => <Tag>{age}</Tag>,
        },
    ]

    const exit = async () => {
        await Promise.all([
            fetch('/api/users/exit'),
            router.push('/login')
        ])
    };

  return (
      <Layout>
          <Head>
              <title>Test App</title>
          </Head>
          <Layout.Header className={styles.header}>
              <Typography.Text>
                  Test App
              </Typography.Text>
              <Button onClick={exit}>
                  Выйти
              </Button>
          </Layout.Header>
          <Layout.Content className={styles.content}>
              <Table
                  rowKey="id"
                  columns={columns}
                  dataSource={users}
                  pagination={false}
              />
          </Layout.Content>
      </Layout>
  )
}
