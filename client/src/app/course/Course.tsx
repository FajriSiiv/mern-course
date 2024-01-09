"use client";
import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { CarouselCard } from "@/components/carouselCard";
import { getAPICourse } from "@/api/api";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const Card = (props?: any) => {
  const router = useRouter();

  return (
    <div className="h-[300px] flex flex-col gap-y-2 ">
      <div className="flex-[2] bg-black max-h-[130px]"></div>
      <div className="flex-1">
        <h2 className="text-lg font-semibold">
          {props.title ? props.title : "Title Course"}
        </h2>
        <p className="text-xs font-light">
          {props.instructor ? props.instructor : "Muhammad Fajri"}
        </p>
        <p className="flex gap-2 items-center">
          4,9 <Star className="h-4 w-4" />
        </p>
        <p className="text-xl font-semibold">
          ${props.price ? props.price : "19,99"}
        </p>
        <Button
          size="sm"
          className="mt-2"
          onClick={() => router.push("/course/" + props.id)}
        >
          Detail
        </Button>
      </div>
    </div>
  );
};

const Course = () => {
  const [courseData, setCourseData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAPICourse();
        setCourseData(data);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-10">
      <div className="p-10">
        <CarouselCard />
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold">Kursus terpopuler di SiCourse</h2>
        <div className="grid grid-cols-card gap-7  max-sm:px-2 mt-10">
          {courseData.map((course, index) => (
            <Card
              key={index}
              title={course.title}
              instructor={course.instructor}
              price={course.price}
              id={course._id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Course;
