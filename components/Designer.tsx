import React, { useState } from 'react'
import {DragEndEvent, useDndMonitor, useDraggable, useDroppable} from "@dnd-kit/core"
import DesignerSidebar from './DesignerSidebar'
import { cn } from '@/lib/utils'
import { ElementsType, FormElementInstance, FormElements } from './FormElements'
import useDesigner from './hooks/useDesigner'
import { idGenerator } from '@/lib/idGenerator'
import { Button } from './ui/button'
import { BiSolidTrash } from 'react-icons/bi'
function Designer() {
  const  {elements,addElement} = useDesigner();
  const dropable = useDroppable({
    id:"designer-drop-area",
    data:{
      isDesignerDropArea:true,
    },
  })


  console.log(elements)
  useDndMonitor({
    onDragEnd:(e:DragEndEvent)=>{
      const {active,over} = e;
      if(!active || !over) return;
      const isDesignerBtnElement = active.data?.current?.isDesignerBtnElement;

      if(isDesignerBtnElement){
        const type = active.data?.current?.type;
        const newElement = FormElements[type as ElementsType].construct(
          idGenerator()
        );

        addElement(0,newElement);
        console.log("new ELement", newElement)
      }
    },
})


  return (
    <div className='flex w-full h-full'>
        <div className='p-4 w-full'>
            <div 
            ref={dropable.setNodeRef}
            className={cn('bg-background max-w-[920px] h-full rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto',
              dropable.isOver && "ring-2 ring-primary/20"
            )}>
                {!dropable.isOver && elements.length === 0 && <p className='text-3xl text-muted-foreground flex flex-grow items-center font-bold'>Drop here</p>
                
              }
                {dropable.isOver && elements.length === 0  && (<div className='p-4 w-full'>
                  <div className='h-[120px] rounded-md bg-primary/20'></div>
                </div>
            )}
            {elements.length > 0 && (
              <div className="flex flex-col  w-full gap-2 p-4">
                {elements.map((element) =>(
                  <DesignerElementWrapper key={element.id} element={element}/>
                ))}
              </div>
            )}
            </div>
        </div>
        <DesignerSidebar/>
    </div>
  )
}

function DesignerElementWrapper({element}:{element: FormElementInstance}){
  const [mouseIsOver,setMouseOver] = useState<boolean>(false);
  const {removeElement} = useDesigner();
  const topHalf = useDroppable({
    id:element.id+"-top",
    data:{
      type:element.type,
      elementId:element.id,
      isTopHalfDesignerElement:true,
    }
  });

  const bottomHalf = useDroppable({
    id:element.id+"-bottom",
    data:{
      type:element.type,
      elementId:element.id,
      isBottomHalfDesignerElement:true,
    }
  });

  const draggable = useDraggable({
    id:element.id+"-drag-handler",
    data:{
      type:element.type,
      elementId : element.id,
      isDesignerElement: true
    }
  })


  


  if(draggable.isDragging) return null;
  const DesignerElement = FormElements[element.type].designerComponent;
  return<div ref={draggable.setNodeRef} {...draggable.listeners} {...draggable.attributes} className='relative h-[120px] flex flex-col text-foreground hover:cursor-poiter rounded-md ring-1 ring-accent ring-inset'
  onMouseEnter={()=>{
    setMouseOver(true)
  }}
  onMouseLeave={()=>{
    setMouseOver(false)
  }}
  >



    {mouseIsOver && (
        <>
        <div className="z-[1000] absolute right-0 z-1 h-full">
          <Button className='flex justify-center h-full border rounded-md rounded-l-none bg-red-500'  variant={"outline"}
          onClick={()=>{
            removeElement(element.id)
          }}
          >
            <BiSolidTrash className="h-6 w-6"/>
          </Button>
        </div>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse '>
          <p className="text-muted-foreground text-sm">Click for properties</p>
        </div>
        </>
      )
    }
    {topHalf.isOver && (
        <div className='absolute top-0 w-full rounded-md h-[7px] bg-primary'/>
    )}
   <div className={cn('flex w-full h-[120px] items-center rounded-md bg-accent/40 px-4 py-2 pointer-event-none opacity-100',
      mouseIsOver && 'opacity-30',
   )}>
    <DesignerElement elementInstance={element}/>
  </div>
  {bottomHalf.isOver && (
        <div className='absolute bottom-0 w-full rounded-md h-[7px] bg-primary'/>
    )}
  </div>
}

export default Designer