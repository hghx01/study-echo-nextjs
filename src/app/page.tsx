"use client"

import { useRouter } from 'next/navigation'
import { useState } from "react"

export default function Home() {
  const [inputValue, setInputValue] = useState('')
  const router = useRouter()
  
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!inputValue.trim()) {
      alert("오늘 배운 내용을 입력해주세요!")
      return
    }

    const encodedValue = encodeURIComponent(inputValue) // 한글, 특수문자, 띄어쓰기를 URL용 안전한 문자열로 변환
    router.push(`/summary?content=${encodedValue}`) // 일단 url에 데이터 저장
  }

  return (
    <main className="flex flex-col flex-1 justify-center py-6">
      {/* 상단 헤더 섹션 */}
      <div className="space-y-3 mb-8 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 text-xs font-medium border border-emerald-100 dark:border-emerald-900/50">
          🌱 에너지 소모 제로 복습 노트
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-stone-800 dark:text-stone-100">
          오늘의 공부 일기
        </h1>
        <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed">
          정리할 필요 없어요. 의식의 흐름대로, 기억나는 단어나 문장을 산발적으로 마구 적어보세요. 나머지는 AI가 알아서 정리합니다.
        </p>
      </div>

      {/* 입력 폼 */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <textarea
            value={inputValue}
            onChange={handleChange}
            rows={12}
            className="w-full rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/50 p-5 text-stone-700 dark:text-stone-300 shadow-sm placeholder:text-stone-400 dark:placeholder:text-stone-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all resize-none leading-relaxed text-base"
            placeholder="예시: 오늘 리액트 라우터 돔 새로 배웠는데 쿼리 스트링 추출하는 거 생각보다 헷갈림.. useSearchParams 썼던 것 같고.. 아 맞다 대소문자 구분 조심하라고 했음. 대충 적어도 찰떡같이 요약해 주겠지?"
          />
          
          {/* 글자수 표시 (우측 하단 은은하게) */}
          <div className="absolute bottom-4 right-4 text-xs text-stone-400 pointer-events-none">
            {inputValue.length}자 입력 중
          </div>
        </div>

        {/* 제출 버튼 */}
        <button 
          type="submit"
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-stone-800 dark:bg-stone-200 py-4 px-6 font-semibold text-white dark:text-stone-950 shadow-md hover:bg-stone-700 dark:hover:bg-stone-100 active:scale-[0.99] transition-all cursor-pointer"
        >
          <span>오늘 하루 정리하기</span>
          <span className="text-emerald-400 dark:text-emerald-600">✨</span>
        </button>
      </form>
    </main>
  )
}