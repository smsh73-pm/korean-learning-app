import { Curriculum, CurriculumLesson, LearningGoal } from '@/types'

export class CurriculumService {
  static generateCurriculum(
    userLevel: number,
    goal: 'topik' | 'university' | 'career' | 'marriage' | 'general',
    preferences: {
      studyTimePerDay: number // minutes
      focusAreas: string[]
      learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'mixed'
    }
  ): Curriculum {
    const lessons = this.generateLessons(userLevel, goal, preferences)
    
    return {
      id: `curriculum-${Date.now()}`,
      userId: 'current-user',
      title: this.getCurriculumTitle(goal, userLevel),
      description: this.getCurriculumDescription(goal, userLevel),
      level: userLevel,
      goal,
      estimatedDuration: this.calculateDuration(lessons, preferences.studyTimePerDay),
      lessons,
      progress: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  }

  private static generateLessons(
    level: number,
    goal: string,
    preferences: any
  ): CurriculumLesson[] {
    const lessons: CurriculumLesson[] = []
    let order = 1

    // Level-based lesson generation
    if (level <= 2) {
      // Beginner lessons
      lessons.push(...this.getBeginnerLessons(order))
      order += this.getBeginnerLessons(1).length
    }

    if (level >= 2 && level <= 4) {
      // Intermediate lessons
      lessons.push(...this.getIntermediateLessons(order))
      order += this.getIntermediateLessons(1).length
    }

    if (level >= 4) {
      // Advanced lessons
      lessons.push(...this.getAdvancedLessons(order))
    }

    // Goal-specific lessons
    const goalLessons = this.getGoalSpecificLessons(goal, order)
    lessons.push(...goalLessons)

    return lessons
  }

  private static getBeginnerLessons(startOrder: number): CurriculumLesson[] {
    return [
      {
        id: `lesson-${startOrder}`,
        title: 'Hangeul 마스터',
        description: '한글 자모음 완전 정복',
        type: 'vocabulary',
        difficulty: 1,
        estimatedTime: 30,
        prerequisites: [],
        objectives: ['한글 읽기', '한글 쓰기', '기본 발음'],
        content: {
          vocabulary: ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'],
          exercises: [
            {
              id: 'ex-1',
              type: 'multiple-choice',
              question: '다음 중 자음이 아닌 것은?',
              options: ['ㄱ', 'ㅏ', 'ㄴ', 'ㄷ'],
              correctAnswer: 1,
              explanation: 'ㅏ는 모음입니다.'
            }
          ]
        },
        isCompleted: false,
        order: startOrder,
      },
      {
        id: `lesson-${startOrder + 1}`,
        title: '기본 인사말',
        description: '일상에서 사용하는 한국어 인사',
        type: 'conversation',
        difficulty: 1,
        estimatedTime: 25,
        prerequisites: [`lesson-${startOrder}`],
        objectives: ['인사 표현', '기본 대화', '예의 표현'],
        content: {
          vocabulary: ['안녕하세요', '안녕히 가세요', '감사합니다', '죄송합니다'],
          conversationScripts: [
            {
              id: 'script-1',
              title: '첫 만남',
              participants: ['A', 'B'],
              lines: [
                { speaker: 'A', text: '안녕하세요!', translation: 'Hello!' },
                { speaker: 'B', text: '안녕하세요!', translation: 'Hello!' }
              ]
            }
          ]
        },
        isCompleted: false,
        order: startOrder + 1,
      },
    ]
  }

  private static getIntermediateLessons(startOrder: number): CurriculumLesson[] {
    return [
      {
        id: `lesson-${startOrder}`,
        title: '문법 패턴 마스터',
        description: '중급 한국어 문법 구조 학습',
        type: 'grammar',
        difficulty: 3,
        estimatedTime: 40,
        prerequisites: [],
        objectives: ['문법 이해', '문장 구성', '의미 전달'],
        content: {
          grammar: ['-는/은', '-을/를', '-에', '-에서', '-와/과'],
          exercises: [
            {
              id: 'ex-1',
              type: 'fill-in-blank',
              question: '저는 학생___입니다.',
              options: ['은', '는', '을', '를'],
              correctAnswer: 1,
              explanation: '주어 뒤에는 주제를 나타내는 조사 \'는\'을 사용합니다.'
            }
          ]
        },
        isCompleted: false,
        order: startOrder,
      },
    ]
  }

  private static getAdvancedLessons(startOrder: number): CurriculumLesson[] {
    return [
      {
        id: `lesson-${startOrder}`,
        title: '고급 표현과 뉘앙스',
        description: '세밀한 의미 차이와 고급 표현',
        type: 'culture',
        difficulty: 5,
        estimatedTime: 50,
        prerequisites: [],
        objectives: ['뉘앙스 이해', '고급 표현', '문화적 맥락'],
        content: {
          culturalNotes: ['한국의 존댓말 문화', '상황별 언어 사용', '감정 표현의 미묘함'],
          exercises: [
            {
              id: 'ex-1',
              type: 'multiple-choice',
              question: '상사에게 사용할 수 있는 표현은?',
              options: ['안녕', '안녕하세요', '안녕하십니까', '안녕히 가세요'],
              correctAnswer: 2,
              explanation: '상사에게는 가장 정중한 표현인 \'안녕하십니까\'를 사용합니다.'
            }
          ]
        },
        isCompleted: false,
        order: startOrder,
      },
    ]
  }

  private static getGoalSpecificLessons(
    goal: string,
    startOrder: number
  ): CurriculumLesson[] {
    const goalLessons: Record<string, CurriculumLesson[]> = {
      topik: [
        {
          id: `lesson-topik-${startOrder}`,
          title: 'TOPIK 시험 전략',
          description: 'TOPIK 시험 대비 전략과 팁',
          type: 'reading',
          difficulty: 3,
          estimatedTime: 45,
          prerequisites: [],
          objectives: ['시험 전략', '시간 관리', '문제 유형 파악'],
          content: {
            readingText: 'TOPIK 시험에서 중요한 것은 시간 관리입니다...',
            exercises: [
              {
                id: 'ex-topik-1',
                type: 'multiple-choice',
                question: 'TOPIK 읽기 영역에서 가장 중요한 것은?',
                options: ['속도', '정확성', '시간 관리', '어휘력'],
                correctAnswer: 2,
                explanation: 'TOPIK에서는 제한된 시간 내에 많은 문제를 풀어야 하므로 시간 관리가 중요합니다.'
              }
            ]
          },
          isCompleted: false,
          order: startOrder,
        },
      ],
      university: [
        {
          id: `lesson-uni-${startOrder}`,
          title: '대학 생활 한국어',
          description: '대학에서 필요한 한국어 표현',
          type: 'conversation',
          difficulty: 3,
          estimatedTime: 35,
          prerequisites: [],
          objectives: ['수업 참여', '발표 표현', '학술 용어'],
          content: {
            vocabulary: ['강의', '과제', '시험', '발표', '토론'],
            conversationScripts: [
              {
                id: 'script-uni-1',
                title: '수업 중 질문',
                participants: ['학생', '교수'],
                lines: [
                  { speaker: '학생', text: '교수님, 질문이 있습니다.', translation: 'Professor, I have a question.' },
                  { speaker: '교수', text: '네, 말씀하세요.', translation: 'Yes, please go ahead.' }
                ]
              }
            ]
          },
          isCompleted: false,
          order: startOrder,
        },
      ],
      career: [
        {
          id: `lesson-career-${startOrder}`,
          title: '비즈니스 한국어',
          description: '직장에서 사용하는 한국어',
          type: 'conversation',
          difficulty: 4,
          estimatedTime: 40,
          prerequisites: [],
          objectives: ['회의 참여', '업무 보고', '고객 응대'],
          content: {
            vocabulary: ['회의', '보고서', '프로젝트', '데드라인', '협력'],
            conversationScripts: [
              {
                id: 'script-career-1',
                title: '업무 보고',
                participants: ['직원', '상사'],
                lines: [
                  { speaker: '직원', text: '프로젝트 진행 상황을 보고드리겠습니다.', translation: 'I will report on the project progress.' },
                  { speaker: '상사', text: '네, 계속 말씀하세요.', translation: 'Yes, please continue.' }
                ]
              }
            ]
          },
          isCompleted: false,
          order: startOrder,
        },
      ],
      marriage: [
        {
          id: `lesson-marriage-${startOrder}`,
          title: '가족 관계 한국어',
          description: '가족과의 소통을 위한 한국어',
          type: 'culture',
          difficulty: 3,
          estimatedTime: 30,
          prerequisites: [],
          objectives: ['가족 호칭', '예의 표현', '감정 표현'],
          content: {
            vocabulary: ['아버지', '어머니', '시부모', '형제자매', '조카'],
            culturalNotes: ['한국의 가족 문화', '호칭의 중요성', '예의와 존경'],
            exercises: [
              {
                id: 'ex-marriage-1',
                type: 'multiple-choice',
                question: '남편의 어머니를 어떻게 부르나요?',
                options: ['어머니', '시어머니', '장모님', '시부모님'],
                correctAnswer: 1,
                explanation: '남편의 어머니는 \'시어머니\'라고 부릅니다.'
              }
            ]
          },
          isCompleted: false,
          order: startOrder,
        },
      ],
    }

    return goalLessons[goal] || []
  }

  private static getCurriculumTitle(goal: string, level: number): string {
    const goalTitles = {
      topik: 'TOPIK 완벽 대비',
      university: '대학 입학 준비',
      career: '비즈니스 한국어',
      marriage: '가족과의 소통',
      general: '종합 한국어',
    }
    
    const levelNames = ['초급', '중급', '고급']
    const levelName = levelNames[Math.min(Math.floor(level / 2), 2)]
    
    return `${levelName} ${goalTitles[goal as keyof typeof goalTitles] || '한국어 학습'}`
  }

  private static getCurriculumDescription(goal: string, level: number): string {
    const descriptions = {
      topik: 'TOPIK 시험을 위한 체계적인 학습 계획',
      university: '대학 생활에 필요한 한국어 실력 향상',
      career: '직장에서 사용하는 실무 한국어 마스터',
      marriage: '가족과의 원활한 소통을 위한 한국어',
      general: '전반적인 한국어 실력 향상',
    }
    
    return descriptions[goal as keyof typeof descriptions] || '맞춤형 한국어 학습 계획'
  }

  private static calculateDuration(lessons: CurriculumLesson[], studyTimePerDay: number): number {
    const totalMinutes = lessons.reduce((sum, lesson) => sum + lesson.estimatedTime, 0)
    return Math.ceil(totalMinutes / studyTimePerDay)
  }

  static getLearningGoals(): LearningGoal[] {
    return [
      {
        id: 'topik',
        name: 'TOPIK 시험 준비',
        description: '한국어능력시험(TOPIK) 합격을 위한 체계적인 학습',
        targetLevel: 4,
        estimatedDuration: '6-12개월',
        requirements: ['기본 문법', '어휘력', '읽기 실력'],
        benefits: ['공식 인증', '대학 입학', '취업 기회'],
      },
      {
        id: 'university',
        name: '대학 입학 준비',
        description: '한국 대학 입학을 위한 학술 한국어 실력 향상',
        targetLevel: 5,
        estimatedDuration: '8-15개월',
        requirements: ['고급 문법', '학술 어휘', '논문 작성'],
        benefits: ['대학 입학', '장학금', '연구 기회'],
      },
      {
        id: 'career',
        name: '비즈니스 한국어',
        description: '한국 기업에서 일하기 위한 실무 한국어',
        targetLevel: 4,
        estimatedDuration: '6-10개월',
        requirements: ['비즈니스 용어', '회의 참여', '보고서 작성'],
        benefits: ['취업 기회', '승진', '네트워킹'],
      },
      {
        id: 'marriage',
        name: '가족과의 소통',
        description: '한국인 가족과의 원활한 소통을 위한 한국어',
        targetLevel: 3,
        estimatedDuration: '4-8개월',
        requirements: ['가족 호칭', '일상 대화', '문화 이해'],
        benefits: ['가족 관계', '문화 적응', '정서적 안정'],
      },
      {
        id: 'general',
        name: '종합 한국어',
        description: '전반적인 한국어 실력 향상과 문화 이해',
        targetLevel: 3,
        estimatedDuration: '6-12개월',
        requirements: ['기본 실력', '문화 지식', '실용적 표현'],
        benefits: ['일상 소통', '문화 체험', '자신감'],
      },
    ]
  }
}
