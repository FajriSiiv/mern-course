"use client";
import { getAPICourse } from "@/api/api";
import { Button } from "@/components/ui/button";
import { useRouter, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Detail = () => {
  const router = useParams();
  const routerBack = useRouter();
  const [courseData, setCourseData] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAPICourse();

        const filterData = data.filter(
          (fill) => String(fill._id) === router.id
        )[0];

        setCourseData(filterData);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Button onClick={() => routerBack.push("/course")}>Back</Button>
      {courseData ? (
        <div>
          <h1 className="text-xl font-semibold">{courseData.title}</h1>
          <p className="text-base">{courseData.description}</p>
          <p className="text-xs">{courseData.instructor}</p>
          <p className="text-sm ">{courseData.category}</p>
          <p className="text-xl">{courseData.price}</p>
        </div>
      ) : (
        "Loading.."
      )}
    </div>
  );
};

export default Detail;
