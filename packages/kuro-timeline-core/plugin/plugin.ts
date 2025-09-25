// I'm not sure what to do with these yet, but it'll come in handy when
// interest from this project explodes, good that I'm thinking a head lol
// 
// I wouldn't be surprised if someone made an inflation mod of it
// because THAT will be a thing
export abstract class TimelinePlugin { }

/** For built-in plugins only, don't use or you will die */
abstract class _BuiltinPlugin extends TimelinePlugin {
  protected readonly __built_in = true as const
}

class DefineTimelinePlugin extends TimelinePlugin { }