// url로 저장된 데이터 가져오기
"use client"

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function SummaryPage() {
    const searchParams = useSearchParams()
    const rawContent = searchParams.get('content') || '' //앞에 있는 걸 default로 쓰되, null이면 뒤에걸 써라 (OR 연산자)

    const [summary, setSummary] = useState<string>('') // AI가 요약할 글 담을 상태
    const [isLoading, setIsLoading] = useState<boolean>(false) // AI가 요약 중 로딩 상태
    const [error, setError] = useState<string>('') // 에러가 날 경우, 에러 담아둘 상태

    useEffect(() => {
        if (!rawContent) return // 요약할 내용이 없다면 뭐하지 말고 그냥 바로 끝내기

        const fetchSummary = async () => {
            setIsLoading(true) // 로딩 시작
            setError('') // 에러 초기화

            try {
                const response = await fetch('/api/summary', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ content: rawContent}), // JSON 형식으로 직렬화 후 Request
                })

                const data = await response.json() // Response 역직렬화

                if (!response.ok) { // Response의 메서드. 200 대면 .ok true
                    throw new Error(data.error || '요약 요청 실패')
                }

                setSummary(data.summary) // 서버에서 { summary: - } 객체로 보냄
            } catch (err: any) {
                setError(err.message || '알 수 없는 에러가 발생했습니다.')
            } finally {
                setIsLoading(false)
            }
        }

        fetchSummary()
    }, [rawContent])
    // 의존성 배열에 rawContent => 사실상 현재는 바뀔 일이 없지만, react 규칙상 외부 state, props, 변수를 useEffect 내부에 쓴다면, 
    // 명시해줘야. 물론 그냥 [] 해도 현재로선 정상적으로 작동. 추가적으로 나중을 위해서, 요약 페이지에서 수정하는 기능을 넣을 수도 있으니!

    return (
        <main>
            <h1>AI가 요약한 기록</h1>
            <div>
                {isLoading && <p>AI가 열심히 요약하는 중입니다... 잠시만 기다려주세요!</p>}
                {error && <p>에러 발생: {error} </p>}
                {!isLoading && !error && summary && (
                    <p>{summary}</p>
                )}
            </div>    

            <h2>오늘 내가 작성한 기록</h2>
            <div>
                <p>{rawContent || "넘어온 기록이 없습니다."}</p>
            </div>

            <Link href='/'> 메인으로 돌아가기 </Link>
        </main>
    )
}