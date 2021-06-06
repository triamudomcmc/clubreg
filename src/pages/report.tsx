import { FilterSearch } from "@components/common/Inputs/Search";
import PageContainer from "@components/common/PageContainer";
import { ArrowCircleDownIcon } from "@heroicons/react/solid";

const Report = () => {
  return (
    <PageContainer>
      <div className="max-w-6xl pt-10 mx-auto pb-14">
        <h1 className="text-2xl font-medium text-center">สมาชิกชมรม</h1>
        <div className="flex justify-center">
          <div className="absolute w-full px-4 pt-8">
            <div className="flex justify-center max-w-xl mx-auto bg-white border border-gray-300 rounded-lg shadow-md ">
              <div className="flex justify-end w-full h-full">
                <div className="flex justify-center w-full py-[0.54rem] overflow-clip overflow-hidden">
                  <h1 className="text-xl text-TUCMC-gray-600 whitespace-nowrap">
                    NGAO
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-screen px-4 pt-16 pb-20 mx-auto bg-TUCMC-gray-100">
        <div className="flex flex-col mx-auto space-y-4 md:max-w-4xl">
          <div className="flex flex-col space-y-4 md:space-y-0 md:justify-center md:space-x-4 md:w-full md:flex-row">
            <div className="flex flex-col items-center justify-center bg-white rounded-lg px-4 py-3.5 text-TUCMC-gray-600 shadow-md text-xl md:w-1/3">
              <div className="flex flex-col items-center justify-center space-y-2">
                <div>สมาชิกทั้งหมด</div>
                <div className="flex flex-row items-end">
                  <h1 className="text-3xl font-bold text-TUCMC-gray-900">50</h1>
                  <h2 className="text-TUCMC-gray-500">/60</h2>
                </div>
                <div>คน</div>
              </div>
            </div>
            <div className="flex flex-row items-center  justify-center bg-white rounded-lg px-4 py-3.5 text-TUCMC-gray-600  shadow-md text-xl md:w-2/3 divide-gray-300 divide-x-2">
              <div className="flex items-center justify-center w-full py-2 ">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div>สมาชิกใหม่</div>
                  <div className="flex flex-row items-end">
                    <h1 className="text-3xl font-bold text-TUCMC-gray-900">
                      20
                    </h1>
                    <h2 className="text-TUCMC-gray-500">/30</h2>
                  </div>
                  <div>คน</div>
                </div>
              </div>
              <div className="flex items-center justify-center w-full py-2">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div>สมาชิกใหม่</div>
                  <div className="flex flex-row items-end">
                    <h1 className="text-3xl font-bold text-TUCMC-gray-900">
                      30
                    </h1>
                    <h2 className="text-TUCMC-gray-500">/30</h2>
                  </div>
                  <div>คน</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="flex flex-row items-center justify-center bg-white rounded-lg px-4 py-3.5 text-TUCMC-gray-600 shadow-md text-xl w-full divide-gray-300 divide-x-2">
              <div className="flex items-center justify-center w-full py-2">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div>ม.4</div>
                  <div className="flex ">
                    <h1 className="text-3xl font-bold text-TUCMC-gray-900">
                      20
                    </h1>
                  </div>
                  <div>คน</div>
                </div>
              </div>
              <div className="flex items-center justify-center w-full py-2">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div>ม.5</div>
                  <div className="flex ">
                    <h1 className="text-3xl font-bold text-TUCMC-gray-900">
                      30
                    </h1>
                  </div>
                  <div>คน</div>
                </div>
              </div>
              <div className="flex items-center justify-center w-full py-2">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div>ม.6</div>
                  <div className="flex">
                    <h1 className="text-3xl font-bold text-TUCMC-gray-900">
                      30
                    </h1>
                  </div>
                  <div>คน</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-center">
          <div className="absolute w-full px-4 pb-8">
            <div className="flex items-center justify-center max-w-md p-5 mx-auto space-x-2 bg-white border border-gray-300 rounded-md cursor-pointer text-TUCMC-gray-700">
              <ArrowCircleDownIcon className="w-5 h-5" />
              <span>ดาวน์โหลดรายชื่อสมาชิก</span>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-6xl pt-10 mx-auto pb-14">
        <h1 className="pt-16 pb-10 text-xl text-center text-TUCMC-gray-700">
          รายชื่อ
        </h1>
        <div className="flex justify-center">
          <div className="w-full max-w-sm md:max-w-xl">
            <FilterSearch />
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Report;
