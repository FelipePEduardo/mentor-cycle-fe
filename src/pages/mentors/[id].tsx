import Button from "@components/Button";
import Chip from "@components/Chip";
import DashboardCardProfile from "@components/DashboardCardProfile";
import MentoringWeekCard from "@components/MentoringWeekCard/MentoringWeekCard";

import Spinner from "@components/Spinner";
import { useMentorProfile } from "@hooks/useMentorProfile";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import React from "react";
import { buttonVariant } from "@components/Button/Button.types";
import { ScheduleMentorshipModal } from "@components/ScheduleMentorshipModal";

const MentorProfile: NextPage = () => {
  const router = useRouter();
  const [openModal, setOpenModal] = useState<boolean>(false);

  const { id } = router.query;
  const { mentor, loading, error } = useMentorProfile(id as string);

  return (
    <main className="pb-12">
      <div className="py-12 bg-center bg-cover bg-no-repeat bg-[url('/bg-mentor-profile.png')]">
        <div className="flex justify-center sm:justify-start container">
          <DashboardCardProfile
            avatar={"/imgCard.png" || mentor.photoUrl}
            job={mentor.jobTitle || ""}
            name={`${mentor.firstName} ${mentor.lastName}`}
            skills={mentor?.skills || []}
          />
        </div>
      </div>

      <div className="container flex justify-between flex-wrap pt-8 gap-8">
        <div className="max-w-xl">
          <section>
            <h2 className="text-2xl font-bold leading-normal mb-4">
              Sobre mim
            </h2>
            <p>{mentor.biography}</p>
          </section>
          <section className="mt-12 pb-12 border-secondary-01 border-b border-solid">
            <h2 className="text-2xl font-bold leading-normal mb-4">
              Experiência profissional
            </h2>
            <p>{mentor.biography}</p>
          </section>
          <section className="pt-12 flex flex-wrap gap-y-8">
            <p className="font-bold basis-1/2">{mentor.email}</p>
            <p className="font-bold basis-1/2">{mentor.website}</p>
            <p className="font-bold basis-1/2">{`${mentor.country}, ${mentor.state}`}</p>
            <p className="font-bold basis-1/2">{mentor.yearsOfExperience}</p>
          </section>
        </div>
        <section>
          <h2 className="text-3xl font-bold mb-12">Agenda de mentorias</h2>
          <div className="flex flex-col gap-4">
            {mentor?.availability?.map((availability) => (
              <MentoringWeekCard
                key={availability.weekDay}
                day={availability.weekDay}
                description={
                  "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet."
                }
                chips={availability.slots.map((slot) => (
                  <Chip key={slot} variant="quartenary">
                    {slot}
                  </Chip>
                ))}
              />
            ))}
          </div>
          <ScheduleMentorshipModal open={openModal} setOpen={setOpenModal} />
          <Button
            className="mt-12"
            size="regular"
            variant="primary"
            onClick={() => setOpenModal(true)}
          >
            Agendar mentoria
          </Button>
        </section>
      </div>
    </main>
  );
};

export default MentorProfile;
