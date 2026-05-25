import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const { content } = await request.json() // 클라이언트의 요청 Request 객체 받아서 역직렬화 후 구조분해할당

        if (!content) {
            return NextResponse.json({ error: '내용이 없습니다.' }, { status: 400 })
            // return Response.json({ error: '내용이 없습니다.' }, { status: 400 })
            // return new Response(JSON.stringify({ error: '내용이 없습니다.' }), {
            //      status: 400,
            //      headers: {'Content-Type': 'application/json' },
            // })
        }

        await new Promise((resolve) => setTimeout(resolve, 1500))

        const mockSummary = `[AI 요약 결과]
        - 작성하신 데이터가 백엔드(/api/summary) 서버에 성공적으로 도달했습니다!
        - 원본 글자 수: 총 ${content.length}자
        - 전달된 핵심 내용: "${content.substring(0, 20)}..."`

        return NextResponse.json({ summary: mockSummary }) // status의 default는 200 (정상)
    } catch (error) {
        console.error('서버 에러:', error) // 서버 컴 터미널에 에러 메세지
        return NextResponse.json({ error: '서버 에러가 발생했습니다.'}, { status: 500})
    }
}