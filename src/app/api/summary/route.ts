import { NextResponse } from 'next/server'
import { GoogleGenAI } from '@google/genai'

const ai = new GoogleGenAI({})

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

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: [
                {
                    role: 'user',
                    parts: [
                        { text: `다음 내용을 핵심만 요약해줘: \n\n${content}`}
                    ]
                }
            ],
            config: { temperature: 0.5 }
        })

        const summary = response.text

        return NextResponse.json({ summary: summary }) // status의 default는 200 (정상)

    } catch (error) {
        console.error('서버 에러:', error) // 서버 컴 터미널에 에러 메세지
        return NextResponse.json({ error: '서버 에러가 발생했습니다.'}, { status: 500})
    }
}