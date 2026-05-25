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
        <main className="flex flex-col flex-1 py-6 space-y-8">
            
            {/* 상단 네비게이션 헤더 */}
            <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-4">
                <h1 className="text-xl font-bold text-stone-800 dark:text-stone-100 flex items-center gap-2">
                    <span>📝 오늘 하루의 기록</span>
                </h1>
                <Link 
                    href='/' 
                    className="text-sm font-medium text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200 transition-colors"
                >
                    ← 다시 작성하기
                </Link>
            </div>

            {/* 메인 결과 영역 */}
            <div className="space-y-6">
                
                {/* 1. 로딩 상태 UI */}
                {isLoading && (
                    <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/50 p-8 shadow-sm space-y-4 animate-pulse">
                        <div className="flex items-center gap-2">
                            <span className="text-emerald-500 text-lg">✨</span>
                            <h2 className="text-lg font-bold text-stone-700 dark:text-stone-300">AI가 열심히 요약하는 중입니다...</h2>
                        </div>
                        <div className="space-y-2">
                            <div className="h-4 bg-stone-200 dark:bg-stone-800 rounded w-5/6"></div>
                            <div className="h-4 bg-stone-200 dark:bg-stone-800 rounded w-full"></div>
                            <div className="h-4 bg-stone-200 dark:bg-stone-800 rounded w-4/5"></div>
                        </div>
                    </div>
                )}

                {/* 2. 에러 발생 UI */}
                {error && (
                    <div className="rounded-2xl border border-red-200 dark:border-red-900/30 bg-red-50/50 dark:bg-red-950/10 p-6 text-red-600 dark:text-red-400 shadow-sm">
                        <p className="font-semibold flex items-center gap-2">
                            ⚠️ 에러 발생: {error}
                        </p>
                    </div>
                )}

                {/* 3. 요약 완료 UI (정제된 노트처럼 시각화) */}
                {!isLoading && !error && summary && (
                    <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/50 p-8 shadow-md relative overflow-hidden">
                        {/* 다이어리 속지 장식선 같은 느낌의 은은한 포인트 라인 */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>
                        
                        <h2 className="text-lg font-bold text-emerald-700 dark:text-emerald-400 mb-4 flex items-center gap-2">
                            <span>💡 정제된 복습 요약</span>
                        </h2>
                        
                        {/* 이 공간에 AI가 준 텍스트가 줄바꿈을 유지하도록 whitespace-pre-wrap 적용 */}
                        <div className="text-stone-700 dark:text-stone-300 leading-relaxed text-base whitespace-pre-wrap">
                            {summary}
                        </div>
                    </div>
                )}
            </div>    

            {/* 내가 작성했던 원본 기록 (아래쪽에 차분한 서브 카드로 배치) */}
            <div className="rounded-2xl border border-stone-200/60 dark:border-stone-800/60 bg-stone-100/50 dark:bg-stone-900/20 p-6 space-y-3">
                <h2 className="text-sm font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                    내가 던져준 가공 전 기록
                </h2>
                <div className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed max-h-40 overflow-y-auto pr-2">
                    {rawContent || "넘어온 기록이 없습니다."}
                </div>
            </div>

            {/* 하단 빈자리: 추후 확장성(퀴즈 등)을 시각적으로 예고하는 플레이스홀더 */}
            <div className="rounded-xl border border-dashed border-stone-300 dark:border-stone-800 p-6 text-center text-xs text-stone-400 dark:text-stone-500">
                🔒 나중에는 이 아래에 오늘 요약 기반의 [간단한 복습 퀴즈]와 [달력 저장] 기능이 추가될 예정입니다!
            </div>

        </main>
    )
}