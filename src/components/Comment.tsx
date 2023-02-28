import { ThumbsUp, Trash } from 'phosphor-react';
import { useState } from 'react';
import { Avatar } from './Avatar';
import styles from './Component.module.css';

interface CommentProps {
  content: string;
  onDeleteComment: (comment: string) => void;
}

export function Comment({ content, onDeleteComment }: CommentProps) {

  const [likes, setLikes] = useState(0)

  const handleTrashClick = () => {
    onDeleteComment(content)
  }

  const handleLikeComment = () => {
    setLikes((state) => { return state + 1 })
  }

  return (
    <div className={styles.comment}>
      <Avatar hasBorder={false} src="https://github.com/victorsfranco.png" alt="" />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Victor Franco</strong>
              <time title='27 de Fevereiro as 14:10h' dateTime='2023-02-27 14:10:00'>Cerca de 1h atrás</time>
            </div>

            <button title='Deletar Comentario'>
              <Trash size={24} onClick={handleTrashClick} />
            </button>
          </header>

          <p>{content}</p>
        </div>

        <footer>
          <button onClick={handleLikeComment}>
            <ThumbsUp />
            Aplaudir <span>{likes}</span>
          </button>
        </footer>
      </div>
    </div>
  );
}
