import DailyView from "./dailyView";
import LivePowerFlow from "./livePowerFlow";
import Historical from "./historical";
import Impact from "./impact";

export default function Index() {
  return (
    <>
      <div className="flex flex-col w-full h-full space-y-1.5">
        <div className="grid grid-cols-2 gap-1.5">
          <DailyView />
          <LivePowerFlow />
        </div>
        <div className="grid grid-cols-6 gap-1.5">
          <div className="col-span-4">
            <Historical />
          </div>
          <div className="col-span-2">
            <Impact />
          </div>
        </div>
      </div>
    </>
  );
}
