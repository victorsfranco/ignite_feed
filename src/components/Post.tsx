import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import styles from './Post.module.css'
import { FormEvent, ChangeEvent, useState, InvalidEvent } from 'react';

import { Comment } from './Comment';
import { Avatar } from './Avatar'

interface Author {
  name: string;
  role: string;
  avatarUrl: string;
}

interface Content {
  type: 'paragraph' | 'link';
  content: string;
}

export interface PostType {
  id: number;
  author: Author;
  publishedAt: Date;
  content: Content[];
}

interface PostProps {
  post: PostType
}

export function Post({ post }: PostProps) {

  const [comments, setComments] = useState<string[]>([]);
  const [newCommentText, setNewCommentText] = useState('');

  const publishedDateFormatted = format(post.publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR
  })

  const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt, {
    locale: ptBR,
    addSuffix: true
  })

  const handleGetCommentText = (event: ChangeEvent<HTMLTextAreaElement>) => {
    event.target.setCustomValidity('')
    setNewCommentText(event.target.value)
  }

  const handleCreateNewComment = (event: FormEvent) => {
    event.preventDefault();
    setComments([...comments, newCommentText]);
    setNewCommentText('');
  }

  const deleteComment = (comment: string) => {
    const commentsWithoutDeletedOne = comments.filter(i => i !== comment)
    setComments(commentsWithoutDeletedOne)
  }

  const handleNewCommentInvalid = (event: InvalidEvent<HTMLTextAreaElement>) => {
    event.target.setCustomValidity('Este campo é obrigatório!')
  }

  return (
    <article key={post.id} className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={post.author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{post.author.name}</strong>
            <span>{post.author.role}</span>
          </div>
        </div>

        <time title={publishedDateFormatted} dateTime={post.publishedAt.toISOString()}>{publishedDateRelativeToNow}</time>
      </header>

      <div className={styles.content}>
        {post.content.map(line => {
          return (
            line.type === 'paragraph' ?
              <p key={line.content}>{line.content}</p> :
              <p key={line.content}><a href="#">{line.content}</a></p>)
        })}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea
          onChange={handleGetCommentText}
          name='commentField'
          placeholder='Deixe um comentário'
          value={newCommentText}
          onInvalid={handleNewCommentInvalid}
          required
        />

        <footer>
          <button
            disabled={newCommentText.length === 0} type="submit">Publicar
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map(comment => {
          return (
            <Comment
              key={comment}
              content={comment}
              onDeleteComment={deleteComment}
            />
          )
        })}
      </div>
    </article>
  )
}

