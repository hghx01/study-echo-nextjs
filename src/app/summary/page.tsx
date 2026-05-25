// url로 저장된 데이터 가져오기
"use client"

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function SummaryPage() {
    const searchParams = useSearchParams()
    const rawContent = searchParams.get('content') || ''

    return (
        <main>
            <h1>AI가 요약한 기록</h1>
            <div>
                <p>곧 구현 예정!</p>
            </div>    

            <h2>오늘 내가 작성한 기록</h2>
            <div>
                <p>{rawContent}</p>
            </div>
            
            <Link href='/'> 메인으로 돌아가기 </Link>
        </main>
    )
}