import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Captions from '@/components/ui/Captions/Captions';
import Claude from '@/components/ui/Claude/Claude';
import Uploader from '@/components/ui/Uploader/Uploader';

export default async function Upload() {
  const supabase = createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  const { data: subscription, error } = await supabase
    .from('subscriptions')
    .select('*, prices(*, products(*))')
    .in('status', ['trialing', 'active'])
    .maybeSingle();

  if (error) {
    console.log(error);
  }

  if (!user) {
    return redirect('/signin');
  }

  if (!subscription) {
    return redirect('/');
  }

  return (
    <section className="mb-32 bg-black">
      <div className="max-w-6xl px-4 py-8 mx-auto sm:px-6 sm:pt-24 lg:px-8">
        <div className="sm:align-center sm:flex sm:flex-col">
          <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
            Ready to post?
          </h1>
          <p className="max-w-2xl m-auto mt-5 text-xl text-zinc-200 sm:text-center sm:text-2xl">
            Upload your photo for Quippy to write a caption for
          </p>
          <Captions userid={user.id} />
          {/* <h3 className="mt-24 text-2xl font-bold text-white sm:text-center sm:text-3xl">Let's start with uploading a photo and using known brand settings</h3>
          <Uploader userid={user.id} updatePhotoURL={updatePhotoURL} />
          <p className="max-w-2xl m-auto mt-5 text-xl text-zinc-200 sm:text-center sm:text-2xl">Brand settings: Witty, Friendly, and Quirky</p>
          <Claude photo={uploadedPhoto} /> */}
        </div>
      </div>
    </section>
  );
}
