'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Shuffle } from 'lucide-react'

import questions from "@/data/questions.json"

const flashcardsData = questions

export function CardPage() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [isRandom, setIsRandom] = useState(false)
  const toggleRandom = () => setIsRandom(!isRandom)
  const currentCard = flashcardsData[currentCardIndex]

  const getRandomIndex = () => {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * flashcardsData.length)
    } while (randomIndex === currentCardIndex)
    return randomIndex
  }

  const nextCard = () => {
    if (isRandom) {
      setCurrentCardIndex(getRandomIndex())
    } else {
      setCurrentCardIndex((prevIndex) => (prevIndex + 1) % flashcardsData.length)
    }
    setShowAnswer(false)
  }

  const prevCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex - 1 + flashcardsData.length) % flashcardsData.length)
    setShowAnswer(false)
  }

  const toggleAnswer = () => setShowAnswer(!showAnswer)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold">Flashcard {currentCardIndex + 1}/{flashcardsData.length}</CardTitle>
            <div className="flex items-center space-x-2">
              <Switch id="random-mode" checked={isRandom} onCheckedChange={toggleRandom} className="bg-gray-300" />
              <Label htmlFor="random-mode"><Shuffle className="h-4 w-4" /></Label>
            </div>
          </div>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-lg mb-4">{currentCard.question}</p>
          {showAnswer && (
            <p className="text-md text-gray-600 mt-4 p-4 bg-gray-100 rounded">{currentCard.answer}</p>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={prevCard} variant="outline">Previous</Button>
          <Button onClick={toggleAnswer}>{showAnswer ? 'Hide Answer' : 'Show Answer'}</Button>
          <Button onClick={nextCard} variant="outline">Next</Button>
        </CardFooter>
      </Card>
    </div>
  )
}