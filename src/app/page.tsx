"use client"

import { useRouter } from 'next/navigation'
import { useState } from "react"

export default function Home(){

  const [inputValue, setInputValue] = useState('')
  const router = useRouter()
  
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement, HTMLTextAreaElement>) => {
    setInputValue(e.target.value)
  }

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!inputValue.trim()){
      alert("오늘 배운 내용을 입력해주세요!")
      return
    }

    const encodedValue = encodeURIComponent(inputValue) // 한글, 특수문자, 띄어쓰기를 URL용 안전한 문자열로 변환

    router.push(`/summary?content=${encodedValue}`) // 일단 url에 데이터 저장
  }

  return (
    <main>
      <h1>메인 페이지</h1>
      <form onSubmit={handleSubmit}>
        <textarea
        value={inputValue}
        onChange={handleChange}
        placeholder="기록해보세요"
        />
        <button type="submit">
          요약하기
        </button>
      </form>
      <p>현재 입력 중인 값: {inputValue}</p>
    </main>
  )
}