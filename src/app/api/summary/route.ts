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
                        { text: content } // 사용자의 비정제된 원본 데이터만 깔끔하게 전달
                    ]
                }
            ],
            config: { 
                temperature: 0.5,
                // systemInstruction을 활용해 AI의 출력 형태(디자인)를 깔끔한 일기/노트 형식으로 강제합니다.
                systemInstruction: `
                    당신은 사용자의 산발적이고 정리되지 않은 공부 메모를 깔끔하고 가독성 높은 복습 노트로 정제해 주는 친절한 AI 조수입니다.
                    반드시 다음 규칙을 지켜서 한국어로 출력해 주세요:
                    
                    1. 이모지(Emoji)를 적극적으로 활용하여 항목을 시각화하세요.
                    2. 구조는 항상 [오늘의 핵심 키워드], [내용 요약 및 정제], [💡 한 줄 기억하기]의 3단계 포맷으로 나누어 작성하세요.
                    3. 글머리 기호(•, -)와 적절한 줄바꿈을 사용하여 가독성을 극대화하세요.
                    4. 존댓말로 부드럽고 다정한 톤앤매너를 유지하세요 (예: ~했습니다, ~를 배웠어요).
                    5. 마크다운 기호 중 '**텍스트**'(굵게)는 가독성을 위해 적극 사용하되, 무거운 헤더(### 등) 표시는 가급적 제외하고 줄바꿈과 이모지로 구분을 지어주세요.
                `
            }
        })

        const summary = response.text

        return NextResponse.json({ summary: summary }) // status의 default는 200 (정상)

    } catch (error) {
        console.error('서버 에러:', error) // 서버 컴 터미널에 에러 메세지
        return NextResponse.json({ error: '서버 에러가 발생했습니다.'}, { status: 500})
    }
}