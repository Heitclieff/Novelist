#import <UIKit/UIKit.h>
@import UserNotifications;

// change this with extra parameter
@interface AppDelegate : UIResponder <UIApplicationDelegate,UNUserNotificationCenterDelegate>

@property (nonatomic, strong) UIWindow *window;

@end