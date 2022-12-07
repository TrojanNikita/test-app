import {GetServerSidePropsContext} from "next";
import {Button, Layout, Table, Tag, Typography} from "antd";
import {ColumnsType} from "antd/lib/table";
import {User} from "../types/user";
import {users} from "../data/users";
import {router} from "next/client";
import {useRouter} from "next/router";

export async function getServerSideProps({ req, res }: GetServerSidePropsContext) {
    console.log(req.cookies)
    if (!req.cookies?.['session_id']) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }

    return {
        props: {}
    }
}

const headerStyle = { backgroundColor: 'white' }

const contentStyle = { padding: '50px' }

export default function Home() {
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
        document.cookie = ['session_id=', `max-age=${-1}`, 'path=/'].join('; ')

        await router.push('/login')
    };

  return (
      <Layout>
          <Layout.Header style={headerStyle}>
              <Typography.Text>
                  Test App
              </Typography.Text>
              <Button onClick={exit}>
                  Выйти
              </Button>
          </Layout.Header>
          <Layout.Content style={contentStyle}>
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
