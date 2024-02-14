return (
  <div className="max-w-7xl mx-auto px-4 py-8">
    <div className="flex flex-col md:flex-row gap-8 mt-24">
      {/* Image Container */}
      <div className="flex-1">
        <img
          className="w-full h-auto rounded-lg"
          src={eventData.imgurl}
          alt="Event Poster"
        />
      </div>

      {/* Data Container */}
      <div className="flex-1 space-y-6">
        <h1 className="text-3xl text-white font-pop font-bold text-center mb-4">
          {eventData.name}
        </h1>
        <p className="text-lg mb-4 font-pop ">{eventData.description}</p>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-white font-pop mb-2 underline">
            Details
          </h2>
          <p className="mb-1 font-pop">
            Date: <span className="font-medium font-pop ">{eventData.date}</span>
          </p>
          <p className="mb-1 font-pop">
            Time: <span className="font-medium font-pop ">{eventData.time}</span>
          </p>
          <p className="font-pop">
            Category: <span className="font-medium font-pop">{eventData.cat} - {eventData.subcat}</span>
          </p>
        </div>
        <div className="mb-6">
          <h2 className="text-2xl text-white font-semibold mb-2 font-pop underline">
            Organizers
          </h2>
          {eventData.people.map((person, index) => (
            <div key={index} className="mb-2">
              <p>
                <span className="font-medium font-pop">
                  {person.title} : {person.name}, <MdPhone className="inline text-white" /> {person.phno}
                </span>
              </p>
            </div>
          ))}
        </div>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold font-pop text-white mb-2 underline">
            Prizes
          </h2>
          {eventData.prizes.map((prize, index) => (
            <div key={index} className="mb-2">
              <div className="font-medium font-pop">
                {prize.title === "1st" && <TrophyIcon className="text-yellow-500 inline" size={32} />}
                {prize.title === "2nd" && <TrophyIcon className="text-gray-400 inline" size={32} />}
                {prize.title === "3rd" && <TrophyIcon className="text-orange-400 inline" size={32} />}
                {(prize.title !== "1st" && prize.title !== "2nd" && prize.title !== "3rd") || prize.title} {prize.amt}
              </div>
            </div>
          ))}
        </div>
        <div>
          <Button
            className=" hover:bg-green-500 py-4 px-2 font-pop"
            onClick={handleOpen}
          >
            View Rules
          </Button>
          <Dialog open={open} handler={handleOpen}>
            <DialogHeader>Event Rules</DialogHeader>
            <DialogBody className="h-[42rem] overflow-scroll">
              <Typography className="font-normal">
                <ul className="list-disc pl-5">
                  {eventData.rules.map((rule, index) => (
                    <li key={index}>{rule}</li>
                  ))}
                </ul>
              </Typography>
            </DialogBody>
            <DialogFooter className="space-x-2">
              <Button
                className="font-pop"
                variant="text"
                color="blue-gray"
                onClick={handleOpen}
              >
                Cancel
              </Button>
              <Button
                className="font-pop"
                variant="gradient"
                color="green"
                onClick={handleOpen}
              >
                Confirm
              </Button>
            </DialogFooter>
          </Dialog>
        </div>

        {/* Conditional Rendering based on slots_left */}
        {eventData.slots_left > 0 ? (
          <div>
            <h2 className="text-2xl font-semibold text-white font-pop mb-2 underline">
              Register
            </h2>
            <div className="flex flex-col md:flex-row gap-4">
            {currentUser ? (
                        <>
                          {needSignUp ? (
                            <>
                              <button
                                className="bg-blue-500 hover:bg-blue-700 font-pop text-white font-bold py-2 px-4 rounded"
                                onClick={() => {
                                  nav(`/signup?redirect=/events/cultural/${id}`);
                                }}
                              >
                                SignUp to register
                              </button>
                            </>
                          ) : (
                            <div className="flex flex-col">
                              {eventData && eventData.type.toLowerCase() == "team" && (
                                <div className="mt-5 flex flex-col  justify-center mx-0 gap-3">
                                  <div className="w-full text-left">
                                    <h1 className="font-pop text-white">
                                      Add team member
                                    </h1>
                                  </div>
                                  <div className="flex gap-2 ">
                                    <input
                                      type="text"
                                      value={newMemberName}
                                      onChange={(e) => setNewMemberName(e.target.value)}
                                      className="text-white font-pop py-2 px-4 w-72 rounded"
                                      placeholder="Enter team member's name"
                                    />
                                    <button
                                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                      onClick={addTeamMember}
                                    >
                                      <AiOutlinePlus />
                                    </button>
                                  </div>
                                  <div className="w-full flex flex-col items-start gap-2">
                                    {" "}
                                    {/* Adjust for alignment */}
                                    {team.map((member, index) => (
                                      <div
                                        key={index}
                                        className="flex items-center justify-start gap-4 w-full"
                                      >
                                        <button
                                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                                          onClick={() => deleteTeamMember(index)}
                                        >
                                          <AiOutlineMinus />
                                        </button>
                                        <div className="text-xl font-pop text-white flex-1">
                                          {member}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              <div className="w-full flex flex-col  justify-center gap-6">
                                <div className="font-pop text-white mt-7">
                                  REFERRAL CODE
                                </div>
                                <div className="flex w-72 flex-col gap-6">
                                  <input
                                    type="text"
                                    value={refCode}
                                    onChange={handleRefCodeChange}
                                    className="text-white font-pop py-2 px-4 rounded"
                                    placeholder="Enter referral code"
                                  />
                                </div>
                              </div>

                              <button
                                className="bg-blue-500 mt-3 hover:bg-blue-700 font-pop w-72 text-white font-bold py-2 px-4 rounded"
                                onClick={() => {
                                  proceedToPay();
                                }}
                              >
                                REGISTER
                              </button>
                            </div>
                          )}
                        </>
                      ) : (
                        <>
                          <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => {
                              handleSignIn();
                            }}
                          >
                            Sign In to Register
                          </button>
                        </>
                      )}
            </div>
          </div>
        ):(
          <div className="font-pop text-white">
                hello
        </div>
        )}
      </div>
    </div>
  </div>
);
