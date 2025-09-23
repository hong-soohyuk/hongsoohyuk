import {Button, Card, CardContent} from '@/component/ui';
import {getInstagramMediaServer, getInstagramProfileServer} from '@/lib/api/instagram';
import {InstagramMedia} from '@/lib/types';
import Image from 'next/image';
import InstagramFeedClient from './sections/InstagramFeedClient';

export default async function InstagramPage() {
  try {
    // Use HTTP module through server functions
    const [initial, profile] = await Promise.all([getInstagramMediaServer({limit: 12}), getInstagramProfileServer()]);

    const posts: InstagramMedia[] = initial.data ?? [];
    const after = initial.paging?.cursors?.after;

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-8">
            <CardContent>
              <div className="flex items-center gap-6">
                <Image
                  src={profile?.profile_picture_url ?? ''}
                  alt={profile?.username ?? ''}
                  width={96}
                  height={96}
                  className="rounded-full "
                />
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">{profile?.username ?? 'instagram'}</h3>
                  <p className="text-muted-foreground">{profile?.biography ?? ''}</p>
                  <div className="flex gap-4 text-sm">
                    <span>
                      <strong>{profile?.media_count}</strong> posts
                    </span>
                    <span>
                      <strong>{profile?.followers_count ?? 0}</strong> followers
                    </span>
                    <span>
                      <strong>{profile?.follows_count ?? 0}</strong> following
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {posts.length === 0 ? (
            <Card>
              <CardContent className="py-16 text-center">
                <div className="text-6xl mb-4">📷</div>
                <h3 className="text-xl font-semibold mb-2">게시물이 없습니다</h3>

                <Button variant="outline">Instagram 방문하기</Button>
              </CardContent>
            </Card>
          ) : (
            <InstagramFeedClient initialItems={posts} initialAfter={after} />
          )}
        </div>
      </div>
    );
  } catch (error) {
    // Fallback UI for when API calls fail
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="py-16 text-center">
              <div className="text-6xl mb-4">📷</div>
              <h3 className="text-xl font-semibold mb-2">Instagram 데이터를 불러올 수 없습니다</h3>
              <p className="text-muted-foreground mb-4">잠시 후 다시 시도해주세요.</p>
              <Button variant="outline">새로고침</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}
