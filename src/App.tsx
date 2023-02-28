import './global.css';
import styles from './App.module.css';

// Components:
import { Header } from "./components/Header";
import { Sidebar } from './components/Sidebar';
import { Post, PostType } from './components/Post';

const posts: PostType[] = [
  {
    id: 1,
    author: {
      avatarUrl: 'https://github.com/victorsfranco.png',
      name: 'Victor Franco',
      role: 'Web Dev Trainee @ Rhaimes'
    },
    content: [
      { type: 'paragraph', content: 'Fala galeraa 👋' },
      { type: 'paragraph', content: 'Acabei de finalizar mais uum projeto! É um projeto que fiz como objeto de estudo para praticar minhas skills em React.js' },
      { type: 'link', content: 'jane.design/doctorcare' },
    ],
    publishedAt: new Date('2023-02-28 10:00:00')
  },
  {
    id: 2,
    author: {
      avatarUrl: 'https://github.com/maykbrito.png',
      name: 'Mayk Brito',
      role: 'Educator @ Rocketseat'
    },
    content: [
      { type: 'paragraph', content: 'Bom dia a todos!' },
      { type: 'paragraph', content: 'Saiu hoje a nova aula do curso de Node.js , onde abordamos conhecimentos muito pertinentesd para o mercado de trabalho. Se fosse você, não perderia por naaada!' },
      { type: 'link', content: 'rocketseat.com.bt/node.js/aula4' },
    ],
    publishedAt: new Date('2023-02-25 14:00:00')
  }
]
export function App() {

  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map(post => {
            return (
              <Post
                key={post.id}
                post={post}
              />
            )
          })}
        </main>
      </div>


    </div>
  )
}
