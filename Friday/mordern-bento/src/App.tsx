import {
  Star,
  TrendingUp,
  Users,
  Calendar,
  BarChart3,
  Zap,
} from 'lucide-react';

const App = () => {
  return (
    <div className='min-h-screen bg-gray-50 p-4 md:p-8'>
      <div className='max-w-7xl mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-4 auto-rows-fr'>
          {/* Create and schedule content */}
          <div className='bg-orange-100 rounded-2xl p-6 flex flex-col justify-between row-span-1 h-[130%]'>
            <div>
              <h3 className='text-lg font-semibold text-gray-800 mb-2'>
                Create and schedule content quickly
              </h3>
              <div className='flex items-center gap-2 text-sm text-gray-600 mb-4'>
                <span>Schedule Post</span>
                <Zap className='w-4 h-4' />
              </div>
            </div>
            <div className='flex justify-end'>
              <div className='w-8 h-8 bg-orange-200 rounded-full flex items-center justify-center'>
                <span className='text-orange-600'>→</span>
              </div>
            </div>
          </div>

          {/* Social Media 10x Faster */}
          <div className='bg-purple-600 rounded-2xl p-6 text-white lg:col-span-2'>
            <h2 className='text-2xl font-bold mb-2'>Social Media 10x</h2>
            <h2 className='text-2xl font-bold mb-4'>Faster with AI</h2>
            <div className='flex items-center gap-1 mb-4'>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className='w-4 h-4 fill-yellow-400 text-yellow-400'
                />
              ))}
            </div>
            <p className='text-purple-100 text-sm'>
              Create engaging content with AI assistance
            </p>
          </div>

          {/* Schedule to social media */}
          <div className='bg-pink-100 rounded-2xl p-6 row-span-2'>
            <h3 className='text-lg font-semibold text-gray-800 mb-4'>
              Schedule to social media
            </h3>
            <div className='space-y-2 mb-4'>
              <div className='text-sm text-gray-600'>Best Time to Post</div>
              <div className='flex items-center gap-2'>
                <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                <span className='text-sm'>Now</span>
              </div>
            </div>
            <div className='bg-white rounded-lg p-3'>
              <BarChart3 className='w-8 h-8 text-purple-600 mb-2' />
              <div className='flex justify-between items-end'>
                <div className='w-2 h-8 bg-purple-200 rounded'></div>
                <div className='w-2 h-12 bg-purple-400 rounded'></div>
                <div className='w-2 h-6 bg-purple-200 rounded'></div>
                <div className='w-2 h-10 bg-purple-600 rounded'></div>
              </div>
            </div>
          </div>

          {/* Write your content using AI */}
          <div className='bg-yellow-200 rounded-2xl p-6 md:row-span-2 mt-16'>
            <h3 className='text-lg font-semibold text-gray-800 mb-4'>
              Write your content using AI
            </h3>
            <div className='bg-white rounded-lg p-4 mb-4'>
              <div className='flex items-center gap-2 mb-2'>
                <div className='w-6 h-6 bg-orange-200 rounded-full'></div>
                <span className='text-sm font-medium'>Content Ideas</span>
              </div>
              <p className='text-xs text-gray-600 mb-3'>
                Generate creative posts for your audience with AI assistance
              </p>
              <div className='space-y-2'>
                <div className='w-full h-2 bg-gray-100 rounded'></div>
                <div className='w-3/4 h-2 bg-gray-100 rounded'></div>
                <div className='w-1/2 h-2 bg-gray-100 rounded'></div>
              </div>
            </div>
            <div className='flex justify-end'>
              <div className='w-8 h-8 bg-yellow-300 rounded-full flex items-center justify-center'>
                <span className='text-yellow-700'>✨</span>
              </div>
            </div>
          </div>

          {/* Manage multiple accounts */}
          <div className='bg-gray-100 rounded-2xl p-6'>
            <h3 className='text-lg font-semibold text-gray-800 mb-4'>
              Manage multiple accounts and platforms
            </h3>
            <div className='flex items-center gap-2 mb-4'>
              <div className='flex -space-x-2'>
                <div className='w-8 h-8 bg-blue-500 rounded-full border-2 border-white'></div>
                <div className='w-8 h-8 bg-pink-500 rounded-full border-2 border-white'></div>
                <div className='w-8 h-8 bg-green-500 rounded-full border-2 border-white'></div>
              </div>
            </div>
            <div className='text-2xl font-bold text-gray-800'>+56%</div>
            <div className='text-sm text-gray-600'>Engagement increase</div>
          </div>

          {/* Maintain consistent posting */}
          <div className='bg-orange-200 rounded-2xl p-6'>
            <h3 className='text-lg font-semibold text-gray-800 mb-4'>
              Maintain a consistent posting schedule
            </h3>
            <div className='flex items-center gap-2 mb-4'>
              <Calendar className='w-5 h-5 text-orange-600' />
              <span className='text-sm text-gray-600'>Daily Schedule</span>
            </div>
            <div className='flex justify-between items-center'>
              <div className='flex gap-1'>
                <div className='w-2 h-2 bg-purple-400 rounded-full'></div>
                <div className='w-2 h-2 bg-purple-600 rounded-full'></div>
                <div className='w-2 h-2 bg-purple-400 rounded-full'></div>
              </div>
            </div>
          </div>

          {/* Analytics */}
          <div className='bg-blue-100 rounded-2xl p-6'>
            <div className='text-2xl font-bold text-gray-800 mb-2'>20642</div>
            <div className='text-sm text-gray-600 mb-4'>Total Reach</div>
            <div className='bg-white rounded-lg p-3'>
              <div className='flex justify-between items-end h-16'>
                <div className='w-3 h-8 bg-blue-300 rounded'></div>
                <div className='w-3 h-12 bg-blue-500 rounded'></div>
                <div className='w-3 h-6 bg-blue-300 rounded'></div>
                <div className='w-3 h-10 bg-blue-600 rounded'></div>
                <div className='w-3 h-14 bg-blue-500 rounded'></div>
              </div>
            </div>
          </div>

          {/* Grow followers */}
          <div className='bg-purple-100 rounded-2xl p-6 col-span-2'>
            <h3 className='text-lg font-semibold text-gray-800 mb-2'>
              Grow followers with quality content
            </h3>
            <div className='flex items-center gap-2 mb-4'>
              <Users className='w-5 h-5 text-purple-600' />
              <TrendingUp className='w-5 h-5 text-green-500' />
            </div>
            <div className='bg-white rounded-lg p-3'>
              <div className='text-sm text-gray-600 mb-2'>
                Optimize post timings
              </div>
              <div className='text-xs text-gray-500'>
                AI analyzes the best times to post for maximum engagement
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
