'use client'
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react'
import { useEffect } from 'react'


function ErrorPage() {
  return (
    <div className='flex w-full h-full flex-col items-center justify-center'>
        <h2>
        Something went wrong
        </h2>
        <Button asChild>
            <Link href={"/"}>
                go back to Home
            </Link>
        </Button>
    </div>
  )
}

export default ErrorPage;