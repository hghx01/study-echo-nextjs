"use client"

import Link from 'next/link'
import { useState } from "react"

export default function Home(){

  const [inputValue, setInputValue] = useState('')
  
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement, HTMLTextAreaElement>) => {
    setInputValue(e.target.value)
  }

  const encodedValue = encodeURIComponent(inputValue) // URL encoding

  return (
    <main>
      <h1>메인 페이지</h1>

      <textarea
      value={inputValue}
      onChange={handleChange}
      placeholder="기록해보세요"
      />

      <Link 
        // href={inputValue.trim() ? `/summary?content=${encodedValue}` : "#"}
        href = {`/summary?content=${encodedValue}`}
        // '#' => '현재 페이지의 최상단으로 이동해라' 라는 표면적인 이유고, 
        // 실제론 링크가 작동은 할 수 있도록 임시 방편으로. UX상으로 어떤 주소로 이동할지 뜨게는 해야해서
        // {} 추가로 더 붙여준 건, jsx문법상 백틱이 있는 이 코드가 js코드라는 걸 알려주기 위한 약속
        onClick={(e)=>{
          if (!inputValue.trim()){
            e.preventDefault()
            alert("오늘 배운 내용을 입력해주세요!")
          }
        }}
        >
        요약하기      
      </Link>
      <p>현재 입력 중인 값: {inputValue}</p>
    </main>
  )
}