'use client'

import { useState } from 'react'

export default function MovingContractApp() {
  const [baseCost, setBaseCost] = useState('')
  const [optionCost, setOptionCost] = useState('')
  const [ladderCost, setLadderCost] = useState('')
  const [depositCost, setDepositCost] = useState('')
  const bankName = '농협'
  const accountNumber = '352-1025-5721-13'
  const accountHolder = '윤도근'

  const totalCost =
    (Number(baseCost) || 0) +
    (Number(optionCost) || 0) +
    (Number(ladderCost) || 0)

  const balanceCost = totalCost - (Number(depositCost) || 0)
  const [optionCount, setOptionCount] = useState(1)
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [startAddress, setStartAddress] = useState('')
  const [endAddress, setEndAddress] = useState('')
  const [packingDate, setPackingDate] = useState('')
  const [moveDate, setMoveDate] = useState('')
  const [startHour, setStartHour] = useState('08')
  const [startMinute, setStartMinute] = useState('00')

  const downloadICS = () => {
    if (!moveDate) {
      alert('운반일을 선택해 주세요.')
      return
    }

    const startDate = new Date(moveDate)
    startDate.setHours(Number(startHour), Number(startMinute), 0)

    const endDate = new Date(startDate)
    endDate.setHours(startDate.getHours() + 2)

    const formatDate = (date: Date) => {
      return date
        .toISOString()
        .replace(/[-:]/g, '')
        .split('.')[0] + 'Z'
    }

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${customerName || '고객'} 이사 일정
DTSTART:${formatDate(startDate)}
DTEND:${formatDate(endDate)}
LOCATION:${startAddress} → ${endAddress}
DESCRIPTION:고객명: ${customerName || '-'}
연락처: ${customerPhone || '-'}
출발지: ${startAddress || '-'}
도착지: ${endAddress || '-'}
시작시간: ${startHour}시 ${startMinute}분
END:VEVENT
END:VCALENDAR`

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
    const url = window.URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `${customerName || '이사일정'}.ics`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const shareContract = async () => {
    const shareText = `이사 견적 계약 안내
총 견적금액: ${totalCost}만원
계약금: ${depositCost || 0}만원
잔금: ${balanceCost}만원
입금계좌: ${bankName} ${accountNumber} (예금주: ${accountHolder})`

    if (navigator.share) {
      await navigator.share({
        title: '이사 견적 계약 안내',
        text: shareText,
      })
    } else {
      await navigator.clipboard.writeText(shareText)
      alert('계좌정보가 포함된 계약 안내문이 복사되었습니다. 카카오톡에 붙여넣어 주세요.')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-3 text-gray-950 antialiased">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-4 space-y-6">
        <h1 className="text-3xl font-extrabold text-center text-gray-950">이사 견적 · 계약서</h1>

        {/* 고객 정보 */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold border-b border-gray-400 pb-2 text-gray-950">고객 정보</h2>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-base font-semibold text-gray-950">고객명</label>
              <input
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full border border-gray-400 rounded-xl p-3 text-base font-semibold text-gray-950 bg-white"
                placeholder="고객명"
              />
            </div>

            <div>
              <label className="text-base font-semibold text-gray-950">연락처</label>
              <input
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full border border-gray-400 rounded-xl p-3 text-base font-semibold text-gray-950 bg-white"
                placeholder="연락처"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-base font-semibold text-gray-950">출발지 주소</label>
              <input
                value={startAddress}
                onChange={(e) => setStartAddress(e.target.value)}
                className="w-full border border-gray-400 rounded-xl p-3 text-base font-semibold text-gray-950 bg-white"
                placeholder="출발지 주소"
              />
            </div>

            <div>
              <label className="text-base font-semibold text-gray-950">도착지 주소</label>
              <input
                value={endAddress}
                onChange={(e) => setEndAddress(e.target.value)}
                className="w-full border border-gray-400 rounded-xl p-3 text-base font-semibold text-gray-950 bg-white"
                placeholder="도착지 주소"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-base font-semibold text-gray-950">포장일</label>
              <input
                type="date"
                value={packingDate}
                onChange={(e) => setPackingDate(e.target.value)}
                className="w-full border border-gray-400 rounded-xl p-3 text-base font-semibold text-gray-950 bg-white"
              />
            </div>

            <div>
              <label className="text-base font-semibold text-gray-950">운반일</label>
              <input
                type="date"
                value={moveDate}
                onChange={(e) => setMoveDate(e.target.value)}
                className="w-full border border-gray-400 rounded-xl p-3 text-base font-semibold text-gray-950 bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-base font-semibold text-gray-950">시작 시간</label>

              <div className="grid grid-cols-2 gap-2">
                <select
                  value={startHour}
                  onChange={(e) => setStartHour(e.target.value)}
                  className="w-full border border-gray-400 rounded-xl p-3 text-base font-semibold text-gray-950 bg-white"
                >
                  {Array.from({ length: 24 }, (_, hour) => (
                    <option key={hour} value={String(hour).padStart(2, '0')}>
                      {String(hour).padStart(2, '0')}시
                    </option>
                  ))}
                </select>

                <select
                  value={startMinute}
                  onChange={(e) => setStartMinute(e.target.value)}
                  className="w-full border border-gray-400 rounded-xl p-3 text-base font-semibold text-gray-950 bg-white"
                >
                  {[0, 10, 20, 30, 40, 50].map((minute) => (
                    <option key={minute} value={String(minute).padStart(2, '0')}>
                      {String(minute).padStart(2, '0')}분
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-base font-semibold text-gray-950">경유지</label>
              <input className="w-full border border-gray-400 rounded-xl p-3 text-base font-semibold text-gray-950 bg-white" placeholder="경유지" />
            </div>
          </div>
        </section>

        {/* 계약 상품 */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold border-b border-gray-400 pb-2 text-gray-950">계약 상품</h2>

          <div className="grid grid-cols-2 gap-3 text-base font-semibold text-gray-950">
            <label><input type="checkbox" /> 포장이사</label>
            <label><input type="checkbox" /> 일반이사</label>

            <label><input type="checkbox" /> 반포장이사</label>
            <label><input type="checkbox" /> 사무실이사</label>

            <div className="flex items-center gap-2 col-span-2 flex-wrap">
              <label><input type="checkbox" /> 보관이사</label>

              <select className="border border-gray-400 rounded-xl p-2 text-base font-semibold text-gray-950 bg-white">
                {Array.from({ length: 365 }, (_, i) => (
                  <option key={i + 1}>{i + 1}일</option>
                ))}
              </select>
            </div>
          </div>

          <h3 className="font-medium">주거 형태</h3>
          <div className="grid grid-cols-2 gap-3 text-base font-semibold text-gray-950">
            <label><input type="checkbox" /> 아파트</label>
            <label><input type="checkbox" /> 빌라</label>
            <label><input type="checkbox" /> 오피스텔/원룸</label>
            <label><input type="checkbox" /> 다세대/단독</label>
            <label><input type="checkbox" /> 상가</label>
          </div>

          <div>
            <label className="text-base font-semibold text-gray-950 block mb-1">작업 용량</label>
            <select className="w-full border border-gray-400 rounded-xl p-3 text-base font-semibold text-gray-950 bg-white">
              <option>1톤</option>
              <option>2.5톤</option>
              <option>5톤</option>
              <option>6톤</option>
              <option>7.5톤</option>
              <option>7.5톤 이상</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-base font-semibold text-gray-950 block mb-1">출발지 운반수단</label>

              <div className="grid grid-cols-2 gap-2">
                <select className="w-full border border-gray-400 rounded-xl p-3 text-base font-semibold text-gray-950 bg-white">
                  <option>사다리차</option>
                  <option>엘레베이터</option>
                  <option>계단작업</option>
                </select>

                <select className="w-full border border-gray-400 rounded-xl p-3 text-base font-semibold text-gray-950 bg-white">
                  {Array.from({ length: 100 }, (_, i) => (
                    <option key={i + 1}>{i + 1}층</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-base font-semibold text-gray-950 block mb-1">도착지 운반수단</label>

              <div className="grid grid-cols-2 gap-2">
                <select className="w-full border border-gray-400 rounded-xl p-3 text-base font-semibold text-gray-950 bg-white">
                  <option>사다리차</option>
                  <option>엘레베이터</option>
                  <option>계단작업</option>
                </select>

                <select className="w-full border border-gray-400 rounded-xl p-3 text-base font-semibold text-gray-950 bg-white">
                  {Array.from({ length: 100 }, (_, i) => (
                    <option key={i + 1}>{i + 1}층</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-base font-semibold text-gray-950 block mb-1">남 작업인원</label>
              <select className="w-full border border-gray-400 rounded-xl p-3 text-base font-semibold text-gray-950 bg-white">
                {Array.from({ length: 11 }, (_, i) => (
                  <option key={i}>{i}명</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-base font-semibold text-gray-950 block mb-1">여 작업인원</label>
              <select className="w-full border border-gray-400 rounded-xl p-3 text-base font-semibold text-gray-950 bg-white">
                {Array.from({ length: 11 }, (_, i) => (
                  <option key={i}>{i}명</option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* 옵션 */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold border-b border-gray-400 pb-2 text-gray-950">옵션 및 추가비용</h2>

          {[1,2,3,4]
            .slice(0, optionCount)
            .map((num) => (
            <div key={num}>
              <label className="text-base font-semibold text-gray-950 block mb-1">옵션 {num}</label>

              <div className="grid grid-cols-2 gap-2">
                <select defaultValue="없음" className="border border-gray-400 rounded-xl p-3 w-full text-base font-semibold text-gray-950 bg-white">
                  <option>없음</option>
                  <option>벽걸이 TV</option>
                  <option>돌침대</option>
                  <option>조립장농</option>
                  <option>피아노</option>
                  <option>날짜옵션</option>
                  <option>이동거리</option>
                  <option>이사작업지연</option>
                  <option>보관비용</option>
                  <option>기타</option>
                </select>

                <select defaultValue="없음" className="border border-gray-400 rounded-xl p-3 w-full text-base font-semibold text-gray-950 bg-white">
                  <option>없음</option>
                  {Array.from({ length: 100 }, (_, i) => (
                    <option key={i + 1}>{i + 1}만원</option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        <button
            type="button"
            onClick={() => setOptionCount((prev) => Math.min(prev + 1, 4))}
            className="w-full border-2 border-dashed border-gray-300 rounded-2xl py-3 text-gray-600 font-medium"
          >
            + 옵션 추가
          </button>
        </section>

        {/* 금액 */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold border-b border-gray-400 pb-2 text-gray-950">견적 금액</h2>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-base font-semibold text-gray-950 block mb-1">기본 이사비용</label>
              <div className="relative">
                <input
                  type="number"
                  value={baseCost}
                  onChange={(e) => setBaseCost(e.target.value)}
                  className="border rounded-xl p-3 w-full pr-14"
                  placeholder="0"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-800 text-base font-semibold">
                  만원
                </span>
              </div>
            </div>

            <div>
              <label className="text-base font-semibold text-gray-950 block mb-1">옵션 비용</label>
              <div className="relative">
                <input
                  type="number"
                  value={optionCost}
                  onChange={(e) => setOptionCost(e.target.value)}
                  className="border rounded-xl p-3 w-full pr-14"
                  placeholder="0"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-800 text-base font-semibold">
                  만원
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-base font-semibold text-gray-950 block mb-1">총 견적 금액</label>
              <div className="relative">
                <input
                  type="number"
                  value={totalCost}
                  readOnly
                  className="border rounded-xl p-3 w-full pr-14 bg-gray-100"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-800 text-base font-semibold">
                  만원
                </span>
              </div>
            </div>

            <div>
              <label className="text-base font-semibold text-gray-950 block mb-1">사다리차 비용</label>
              <div className="relative">
                <input
                  type="number"
                  value={ladderCost}
                  onChange={(e) => setLadderCost(e.target.value)}
                  className="border rounded-xl p-3 w-full pr-14"
                  placeholder="0"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-800 text-base font-semibold">
                  만원
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-base font-semibold text-gray-950 block mb-1">계약금</label>
              <div className="relative">
                <input
                  type="number"
                  value={depositCost}
                  onChange={(e) => setDepositCost(e.target.value)}
                  className="border rounded-xl p-3 w-full pr-14"
                  placeholder="0"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-800 text-base font-semibold">
                  만원
                </span>
              </div>
            </div>

            <div>
              <label className="text-base font-semibold text-gray-950 block mb-1">잔금</label>
              <div className="relative">
                <input
                  type="number"
                  value={balanceCost}
                  readOnly
                  className="border rounded-xl p-3 w-full pr-14 bg-gray-100"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-800 text-base font-semibold">
                  만원
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 입금 계좌 */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold border-b border-gray-400 pb-2 text-gray-950">입금 계좌</h2>

          <div className="rounded-2xl border-2 border-teal-500 bg-white p-4 shadow-sm">
            <div className="flex items-start justify-center gap-12 text-center flex-wrap">
              <div>
                <div className="text-orange-500 text-lg font-black leading-none mb-2">예금주</div>
                <div className="text-xl font-semibold text-gray-950">윤도근</div>
              </div>

              <div>
                <div className="text-orange-500 text-lg font-black leading-none mb-2 text-left">농협</div>
                <div className="text-xl font-semibold tracking-tight text-gray-950">
                  352-1025-5721-13
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 비고 */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold border-b border-gray-400 pb-2 text-gray-950">비고 및 요청사항</h2>

          <div>
            <label className="text-base font-semibold text-gray-950 block mb-1">고객 요청 및 주의사항</label>
            <textarea className="w-full border rounded-xl p-3 h-24" placeholder="고객 요청 및 주의사항" />
          </div>

          <div>
            <label className="text-base font-semibold text-gray-950 block mb-1">견적 제외 품목</label>
            <textarea className="w-full border rounded-xl p-3 h-24" placeholder="견적 제외 품목" />
          </div>

          <div>
            <label className="text-base font-semibold text-gray-950 block mb-1">기타 메모</label>
            <textarea className="w-full border rounded-xl p-3 h-24" placeholder="기타 메모" />
          </div>
        </section>

        {/* 버튼 */}
        <section className="space-y-3 pt-2">
          <button
            type="button"
            onClick={() => window.print()}
            className="w-full bg-black text-white rounded-2xl py-4 font-semibold"
          >
            PDF 계약서 생성
          </button>

          <button
            type="button"
            onClick={downloadICS}
            className="w-full bg-blue-600 text-white rounded-2xl py-4 font-semibold"
          >
            일정 등록 (.ICS)
          </button>

          <button
            type="button"
            onClick={shareContract}
            className="w-full bg-yellow-400 text-black rounded-2xl py-4 font-semibold"
          >
            카카오톡 공유
          </button>
        </section>

        <div className="text-xs text-gray-500 border-t pt-4 leading-6">
          <div className="text-base font-bold text-gray-950 mb-2">
            계약금 입금계좌: {bankName} {accountNumber} (예금주: {accountHolder})
          </div>
          ※ 계약금 10% 납입 시 계약 확정
          <br />※ 카드 및 현금영수증 발행 시 부가세 10% 별도
          <br />※ 견적 외 추가 물품 발생 시 추가 비용 발생 가능
        </div>
      </div>
    </div>
  );
}
