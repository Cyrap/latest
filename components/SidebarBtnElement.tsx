import React from 'react'
import { FormELement } from './FormElements'
import { Button } from './ui/button'
import { useDraggable } from '@dnd-kit/core'
import { cn } from '@/lib/utils'

function SidebarBtnElement({formElement}:{formElement : FormELement}) {
    const {label,icon: Icon} = formElement.designerBtnElement
    const draggable = useDraggable({
        id:`designer-btn-${formElement.type}`,
        data:{
            type:formElement.type,
            isDesignerBtnElement:true,
        },
    })
  return (
    <Button ref={draggable.setNodeRef}
    {...draggable.listeners}
    {...draggable.attributes}
    variant={"outline"}
    className={cn('flex flex-col gap-2 h-[120px] w-[120px] cursor-grab',
        draggable.isDragging && "ring-2 ring-primary"
    )}>
    
        <Icon className='h-8 w-8 text-primary cursor-grab'/>
        <p className='text-xs'>{label}</p>
    </Button>
  )
}


export function SidebarBtnElementDragOverlay({formElement}:{formElement : FormELement}) {
    const {label,icon: Icon} = formElement.designerBtnElement
  return (
    <Button
    variant={"outline"}
    className={'flex flex-col gap-2 h-[120px] w-[120px] cursor-grab'}>
        <Icon className='h-8 w-8 text-primary cursor-grab'/>
        <p className='text-xs'>{label}</p>
    </Button>
  )
}


export default SidebarBtnElement